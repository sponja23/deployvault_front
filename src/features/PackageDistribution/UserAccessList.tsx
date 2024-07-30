import React, { useState } from "react";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";

interface UserAccessListProps {
  repo: string;
  users: string[];
  onEdit: (repo: string, oldEmail: string, newEmail: string) => void;
  onDelete: (repo: string, emailToDelete: string) => void;
}

const UserAccessList: React.FC<UserAccessListProps> = ({ repo, users, onEdit, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditClick = (email: string) => {
    setSelectedEmail(email);
    setEditEmail(email);
    setShowEditModal(true);
  };

  const handleEdit = () => {
    onEdit(repo, selectedEmail, editEmail);
    setShowEditModal(false);
  };

  return (
    <ListGroup>
      {users.map((userEmail) => (
        <ListGroup.Item key={userEmail}>
          {userEmail}
          <Button variant="warning" size="sm" className="ml-2" onClick={() => handleEditClick(userEmail)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" className="ml-2" onClick={() => onDelete(repo, userEmail)}>
            Delete
          </Button>

          {/* Modal para editar */}
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formEditEmail">
                <Form.Label>New Email</Form.Label>
                <Form.Control type="email" placeholder="Enter new email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserAccessList;
