import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const {
    loading: clientLoading,
    error: clientError,
    data: clientList,
  } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.concat([addProject]) },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, status, clientId);
    if (!name || !description || !status || !clientId)
      return alert("Please fill in all fields");
    addProject(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>Error: {clientError.message}</p>;

  return (
    <>
      {!clientLoading && !clientError && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#AddProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="AddProjectModal"
            aria-labelledby="AddProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="AddProjectModalLabel">
                    Add New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="client"
                        value={clientId}
                        className="form-select"
                        onChange={(e) => {
                          console.log("e.target.value", e.target.value);
                          setClientId(e.target.value);
                        }}
                      >
                        {clientList?.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Add Client
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
