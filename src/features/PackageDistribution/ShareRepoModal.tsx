import { Modal, Button, Form } from "react-bootstrap";
import { UploadedPackage } from "./useUploadedPackages";
import { useState } from "react";

type ShareRepoModalProps = {
  show: boolean;
  onHide: () => void;
  onShare: (username: string) => void;
  selectedPackage: UploadedPackage | null;
};

export default function ShareRepoModal({
  show,
  onHide,
  onShare,
  selectedPackage,
}: ShareRepoModalProps) {
  const [username, setUsername] = useState<string>("");

  return (
    <Modal show={show} onShow={() => setUsername("")} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Share Repository {selectedPackage?.name}1
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter target user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onShare(username)}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
