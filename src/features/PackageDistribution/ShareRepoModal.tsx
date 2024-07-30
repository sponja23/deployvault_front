import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/slices/uiSlice";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";

interface ShareRepoModalProps {
  show: boolean;
  onHide: () => void;
  onShare: (email: string) => void;
  email: string;
  setEmail: (email: string) => void;
  selectedRepo: any;
}

const ShareRepoModal: React.FC<ShareRepoModalProps> = ({ show, onHide, onShare, email, setEmail, selectedRepo }) => {
  const isLoading = useAppSelector(selectIsLoading);

  const content = isLoading ? (
    <CaosSpinner />
  ) : (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Share Repository {selectedRepo?.package_name}1</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onShare(email)}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return content;
};

export default ShareRepoModal;
