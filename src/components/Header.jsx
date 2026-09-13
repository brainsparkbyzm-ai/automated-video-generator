import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import PsychologyIcon from "@mui/icons-material/Psychology";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#111827",
        borderRadius: 2,
        mb: 4,
      }}
      elevation={0}
    >
      <Toolbar>
        <PsychologyIcon sx={{ mr: 2, color: "#60A5FA" }} />

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          BrainSpark AI Studio
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip label="AI" color="primary" />
          <Chip label="Documentary" color="success" />
          <Chip label="v2" color="secondary" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}