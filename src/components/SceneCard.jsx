import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function SceneCard({ title, content }) {
  const copy = () => {
    navigator.clipboard.writeText(content);
    alert("Copied!");
  };

  return (
    <Card
      sx={{
        mb: 3,
        background: "#1E293B",
        color: "white",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            whiteSpace: "pre-wrap",
            mb: 2,
          }}
        >
          {content}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={copy}
          >
            Copy
          </Button>

          <Button
            variant="outlined"
          >
            Rewrite
          </Button>

          <Button
            variant="outlined"
          >
            Emotional
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}