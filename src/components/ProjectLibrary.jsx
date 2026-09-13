export default function ProjectLibrary({
  projects,
  loadProject,
  deleteProject,
}) {
  return (
    <div
      style={{
        marginTop: 40,
        background: "#111827",
        padding: 20,
        borderRadius: 15,
      }}
    >
      <h2>📂 My Projects</h2>

      {projects.length === 0 ? (
        <p>No saved projects.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "#1F2937",
              padding: 15,
              borderRadius: 10,
              marginTop: 15,
            }}
          >
            <h4>{project.prompt.slice(0, 50)}...</h4>

            <button
              onClick={() => loadProject(project)}
            >
              Open
            </button>

            <button
              onClick={() => deleteProject(project.id)}
              style={{
                marginLeft: 10,
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}