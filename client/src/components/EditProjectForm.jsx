import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const EditProjectForm = ({ project }) => {
  console.log("project.status", project);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [
      { query: GET_PROJECT_BY_ID, variables: { id: project.id } },
    ],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, status);
    if (!name || !description || !status)
      return alert("Please fill in all fields");
    updateProject(name, description, status );
    setName("");
    setDescription("");
    setStatus("");
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            placeholder="Project Name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="description"
            placeholder="Project description"
          ></textArea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            value={status}
            className="form-select"
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
