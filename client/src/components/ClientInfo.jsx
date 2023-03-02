import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
const ClientInfo = ({ client }) => {
  return (
    <>
      <h5 className="mt-5">Client Info</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge />
          <span className="ms-2">{client?.name}</span>
        </li>
        <li className="list-group-item">
          <FaEnvelope />
          <span className="ms-2">{client?.email}</span>
        </li>
        <li className="list-group-item">
          <FaPhone />
          <span className="ms-2">{client?.phone}</span>
        </li>
      </ul>
    </>
  );
};

export default ClientInfo;
