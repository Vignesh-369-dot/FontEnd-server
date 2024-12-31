import { Badge, Button } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";

export const USER_LIST_COLUMNS = (handleDeleteUser) => {
  return [
    {
      accessorKey: "image",
      header: "Profile",
      cell: ({ row }) => {
        return <Avatar size="sm" name="Sage" src={row.image} />;
      },
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "company",
      header: "Company Name",
      cell: ({ row }) => {
        return <h6> {row.company.name}</h6>;
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        return <Badge variant="surface"> {row.role}</Badge>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button
            colorPalette={"red"}
            size="xs"
            onClick={() => handleDeleteUser(row.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];
};
