import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button onClick={deleteProject} className="btn btn-danger">
        <FaTrash /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
