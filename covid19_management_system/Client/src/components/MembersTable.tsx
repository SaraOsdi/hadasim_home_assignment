import cx from "clsx";
import { useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Modal,
  Button,
} from "@mantine/core";
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";
import { AddMember } from "./AddMember";
import { useDeleteMember } from "../hooks/useDeleteMember";

import classes from "../styles/TableSelection.module.css";
import { UpdateMember } from "./UpdateMember";
import { ToastContainer } from "react-toastify";

const KEY_LIST = ['first_vaccination_date', 'second_vaccination_date', 'third_vaccination_date', 'forth_vaccination_date', 'vaccine_manufactorer', 'positive_test_date', 'recovery_date'];

export function TableSelection({ members }) {
  const [selection, setSelection] = useState(["1"]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateDetailsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const deleteMemberMutation = useDeleteMember();

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateMember = (member) => {
    setSelectedMember(member);
    setIsUpdateDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMember(null);
  };

  const closeUpdateModal = () => {
    setIsUpdateDetailsModalOpen(false);
    setSelectedMember(null);
  };

  const handleDelete = (id) => {
    deleteMemberMutation.mutate(id);
  };

  const rows = members.map((item) => {
    const selected = selection.includes(item.id);
    const fullAddress = `${item.address_city}, ${item.address_street}  ${item.address_house_num}`;
    const formattedDateOfBirth = new Date(
      item.date_of_birth
    ).toLocaleDateString();

    return (
      <Table.Tr
        key={item.id_serial}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td />
        <Table.Td>
          <Group gap="sm">
            {/* <Avatar size={26} src={item.avatar} radius={26} /> */}
            <Avatar size={26} src={`http://localhost:3302/uploads/${item.id_official}.jpg`} radius={26} />

            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.id_official}</Table.Td>
        <Table.Td>{item.phone_number}</Table.Td>
        <Table.Td>{item.cellphone}</Table.Td>
        <Table.Td>{fullAddress}</Table.Td>
        <Table.Td>{formattedDateOfBirth}</Table.Td>

        <Table.Td>
          <MdInfo
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => handleViewDetails(item)}
          />
          <MdDelete
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(item.id)}
          />
          <MdEdit
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateMember(item)}
          />
        </Table.Td>
      </Table.Tr>
    );
  });

  const hasValues = selectedMember && Object.entries(selectedMember).filter((item) => {
    const key = item[0]
    const value = item[1]
    return KEY_LIST.includes(key) && value
  }).length > 0

  return (
    <div style={{ marginBottom: rem(20), textAlign: "center" }}>
      <h1 style={{ marginBottom: rem(10) }}>Covid19 Management System</h1>
      <Button
        variant="outline"
        color="blue"
        style={{ marginBottom: rem(10) }}
        onClick={() => setIsAddMemberModalOpen(true)}
      >
        + Add Member
      </Button>
      <ScrollArea h={390}>
        <Table
          stickyHeader
          miw={700}
          verticalSpacing="sm"
          horizontalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Member</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Id</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Phone number</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Cell phone</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Address</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Date Of Birth</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      {selectedMember && (
        <Modal
          title="Member Details"
          opened={isDetailsModalOpen}
          onClose={closeDetailsModal}
        >
          {hasValues ?
            Object.entries(selectedMember).map(([key, value]) => {
              if (!value) {
                return null
              }
              console.log(key)

              if (KEY_LIST.includes(key)) {

                return (< Text style={{ textAlign: "center" }} key={key}>
                  {`${key}:   ${key.includes("date")
                    ? value ? new Date(value).toLocaleDateString() : '-'
                    : value
                    }`}
                </Text>)
              }

            }) : <div>No information yet</div>}
        </Modal>
      )
      }
      {
        isAddMemberModalOpen && (
          <Modal
            title="Add Member"
            opened={isAddMemberModalOpen}
            onClose={() => setIsAddMemberModalOpen(false)}
            size={'100%'}
          >
            <AddMember />
          </Modal>
        )
      }
      {
        isUpdateModalOpen && (
          <Modal
            title="Update Member"
            opened={isUpdateModalOpen}
            onClose={closeUpdateModal}
          >
            <UpdateMember selectedMember={selectedMember} />
          </Modal>
        )
      }
    </div >
  );
}
