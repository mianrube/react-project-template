import { startTransition, useDeferredValue, useState } from 'react';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { ErrorState, LoadingState } from '@shared/components';
import { useScopedTranslation } from '@shared/hooks';

import { enqueueMessage } from '@features/app-feedback/store';
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqsQuery,
  useUpdateFaqMutation,
} from '@features/faqs/api';

import { useAppDispatch } from '@store';

import { FaqDetailsCard, FaqForm, FaqListPanel } from '../components';
import {
  DEFAULT_FAQ_FORM_VALUES,
  type FaqFormValues,
  matchesFaqSearch,
  toFaqFormValues,
} from '../model';

const BASE_KEY = 'pages.FaqManagementPage';

type FaqEditorMode = 'create' | 'edit' | 'view';

export const FaqManagementPage = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'faqs' });
  const dispatch = useAppDispatch();
  const {
    data: faqItems,
    isError: isFaqsError,
    isLoading: isFaqsLoading,
    refetch: refetchFaqs,
  } = useGetFaqsQuery();
  const [createFaq, { isLoading: isCreatingFaq }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdatingFaq }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeletingFaq }] = useDeleteFaqMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<FaqEditorMode>('view');

  const items = faqItems ?? [];

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const filteredFaqs = items.filter((faq) => matchesFaqSearch(faq, deferredSearchQuery));
  const displayedSelectedFaqId = items.some((faq) => faq.id === selectedFaqId)
    ? selectedFaqId
    : (items[0]?.id ?? null);
  const selectedFaq = items.find((faq) => faq.id === displayedSelectedFaqId);
  const publishedCount = items.filter((faq) => faq.isPublished).length;

  if (isFaqsLoading && !faqItems) {
    return <LoadingState label={tScoped('states.loading')} />;
  }

  if (isFaqsError || !faqItems) {
    return (
      <ErrorState
        description={tScoped('states.errorDescription')}
        onRetry={() => {
          void refetchFaqs();
        }}
        title={tScoped('states.errorTitle')}
      />
    );
  }

  const handleSelectFaq = (faqId: string) => {
    startTransition(() => {
      setSelectedFaqId(faqId);
      setEditorMode('view');
    });
  };

  const handleStartCreate = () => {
    startTransition(() => {
      setEditorMode('create');
    });
  };

  const handleStartEdit = () => {
    if (!selectedFaq) {
      return;
    }

    startTransition(() => {
      setEditorMode('edit');
    });
  };

  const handleCancelEdition = () => {
    startTransition(() => {
      setEditorMode('view');
    });
  };

  const handleCreateSubmit = async (values: FaqFormValues) => {
    const createdFaq = await createFaq(values).unwrap();

    startTransition(() => {
      setSelectedFaqId(createdFaq.id);
      setEditorMode('view');
    });

    dispatch(
      enqueueMessage({
        id: crypto.randomUUID(),
        severity: 'success',
        title: tScoped('feedback.createSuccessTitle'),
        description: tScoped('feedback.createSuccessDescription', {
          question: values.question,
        }),
      }),
    );
  };

  const handleEditSubmit = async (values: FaqFormValues) => {
    if (!selectedFaq) {
      return;
    }

    const updatedFaq = await updateFaq({ id: selectedFaq.id, values }).unwrap();

    startTransition(() => {
      setSelectedFaqId(updatedFaq.id);
      setEditorMode('view');
    });

    dispatch(
      enqueueMessage({
        id: crypto.randomUUID(),
        severity: 'success',
        title: tScoped('feedback.editSuccessTitle'),
        description: tScoped('feedback.editSuccessDescription', {
          question: values.question,
        }),
      }),
    );
  };

  const handleDeleteFaq = async () => {
    if (!selectedFaq) {
      return;
    }

    const removedFaqId = selectedFaq.id;
    const removedQuestion = selectedFaq.question;

    await deleteFaq(removedFaqId).unwrap();

    startTransition(() => {
      const remainingFaqs = items.filter((faq) => faq.id !== removedFaqId);
      setSelectedFaqId(remainingFaqs[0]?.id ?? null);
      setEditorMode('view');
    });

    dispatch(
      enqueueMessage({
        id: crypto.randomUUID(),
        severity: 'success',
        title: tScoped('feedback.deleteSuccessTitle'),
        description: tScoped('feedback.deleteSuccessDescription', {
          question: removedQuestion,
        }),
      }),
    );
  };

  const isCreateMode = editorMode === 'create';
  const isEditMode = editorMode === 'edit' && Boolean(selectedFaq);
  const isMutating = isCreatingFaq || isUpdatingFaq || isDeletingFaq;

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        sx={(theme) => ({
          border: 1,
          borderColor: 'divider',
          borderRadius: 5,
          overflow: 'hidden',
          p: { xs: 3, md: 4 },
          background: `radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.16)} 0%, ${alpha(theme.palette.background.paper, 0.96)} 42%, ${theme.palette.background.paper} 100%)`,
        })}
      >
        <Stack spacing={2} sx={{ maxWidth: 860 }}>
          <Chip label={tScoped('eyebrow')} sx={{ alignSelf: 'flex-start' }} variant="outlined" />
          <Typography variant="h3">{tScoped('title')}</Typography>
          <Typography color="text.secondary" variant="body1">
            {tScoped('description')}
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip label={tScoped('stats.total', { count: items.length })} size="small" />
            <Chip
              color="success"
              label={tScoped('stats.published', { count: publishedCount })}
              size="small"
              variant="outlined"
            />
            <Chip
              label={tScoped('stats.filtered', { count: filteredFaqs.length })}
              size="small"
              variant="outlined"
            />
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', xl: 'minmax(360px, 420px) minmax(0, 1fr)' },
        }}
      >
        <FaqListPanel
          items={filteredFaqs}
          onCreate={handleStartCreate}
          onSearchChange={setSearchQuery}
          onSelect={handleSelectFaq}
          searchQuery={searchQuery}
          selectedFaqId={displayedSelectedFaqId}
          totalCount={items.length}
          variant="admin"
        />

        <Stack spacing={3}>
          <Stack
            alignItems={{ xs: 'stretch', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5">{tScoped('workspace.title')}</Typography>
              <Typography color="text.secondary" variant="body2">
                {isCreateMode
                  ? tScoped('workspace.createDescription')
                  : isEditMode
                    ? tScoped('workspace.editDescription')
                    : tScoped('workspace.detailDescription')}
              </Typography>
            </Stack>

            {!isCreateMode ? (
              <Button
                onClick={handleStartCreate}
                startIcon={<AddOutlinedIcon />}
                variant="outlined"
              >
                {tScoped('workspace.newAction')}
              </Button>
            ) : null}
          </Stack>

          {isCreateMode ? (
            <FaqForm
              description={tScoped('createDescription')}
              initialValues={DEFAULT_FAQ_FORM_VALUES}
              mode="create"
              onCancel={handleCancelEdition}
              onSubmit={handleCreateSubmit}
              title={tScoped('createTitle')}
            />
          ) : isEditMode && selectedFaq ? (
            <FaqForm
              description={tScoped('editDescription')}
              initialValues={toFaqFormValues(selectedFaq)}
              mode="edit"
              onCancel={handleCancelEdition}
              onSubmit={handleEditSubmit}
              title={tScoped('editTitle')}
            />
          ) : (
            <FaqDetailsCard
              faq={selectedFaq}
              onCreate={handleStartCreate}
              onDelete={isMutating ? undefined : handleDeleteFaq}
              onEdit={isMutating ? undefined : handleStartEdit}
              variant="admin"
            />
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
