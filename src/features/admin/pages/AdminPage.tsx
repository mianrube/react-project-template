import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

export const AdminPage = () => {
  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      <Box>
        <Stack spacing={1.5} sx={{ maxWidth: 760 }}>
          <Typography variant="h3">Administration</Typography>
          <Typography color="text.secondary" variant="body1">
            Manage internal content and access the operational tools reserved for administrators.
          </Typography>
        </Stack>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 4, maxWidth: 760 }} variant="outlined">
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5}>
            <SettingsSuggestOutlinedIcon color="primary" />
            <Typography variant="h5">FAQ management</Typography>
          </Stack>

          <Typography color="text.secondary" variant="body2">
            Create, update, and remove help center entries from the administration area.
          </Typography>

          <Stack direction="row" justifyContent="flex-start">
            <Button
              component={Link}
              startIcon={<QuestionAnswerOutlinedIcon />}
              to="/admin/faqs"
              variant="contained"
            >
              Open FAQ management
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
