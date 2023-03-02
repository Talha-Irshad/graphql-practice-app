import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(
      clientId: $clientId
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      status
      description
      client {
        name
        email
        phone
        id
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      status
      description
      client {
        name
        email
        phone
        id
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
