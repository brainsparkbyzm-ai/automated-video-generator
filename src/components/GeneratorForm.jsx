import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

export default function GeneratorForm({
  topic,
  setTopic,
  duration,
  setDuration,
  language,
  setLanguage,
  model,
  setModel,
  loading,
  generateDocumentary,
  copyResult,
  downloadPDF,
}) {
  return (
    <Box
      sx={{
        background: "#111827",
        padding: 4,
        borderRadius: 3,
        mb: 4,
      }}
    >
      <TextField
        fullWidth
        label="Documentary Topic"
        placeholder="Example: The Fall of the Roman Empire"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        margin="normal"
        variant="outlined"
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mt: 2 }}
      >
        <TextField
          select
          fullWidth
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <MenuItem value="10 Minutes">10 Minutes</MenuItem>
          <MenuItem value="15 Minutes">15 Minutes</MenuItem>
          <MenuItem value="20 Minutes">20 Minutes</MenuItem>
          <MenuItem value="30 Minutes">30 Minutes</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Urdu">Urdu</MenuItem>
          <MenuItem value="French">French</MenuItem>
          <MenuItem value="Hindi">Hindi</MenuItem>
        </TextField>
      </Stack>

      <TextField
        select
        fullWidth
        label="AI Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        margin="normal"
      >
        <MenuItem value="google/gemini-2.5-flash">
          Gemini 2.5 Flash (Fast)
        </MenuItem>

        <MenuItem value="openai/gpt-4o-mini">
          GPT-4o Mini
        </MenuItem>

        <MenuItem value="anthropic/claude-3.5-sonnet">
          Claude 3.5 Sonnet
        </MenuItem>
      </TextField>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={generateDocumentary}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "🚀 Generate Documentary"}
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={copyResult}
        >
          📋 Copy Script
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={downloadPDF}
        >
          📄 Download PDF
        </Button>
      </Stack>
    </Box>
  );
}