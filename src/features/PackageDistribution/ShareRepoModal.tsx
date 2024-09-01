import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/slices/uiSlice";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";

interface ShareRepoModalProps {
  show: boolean;
  onHide: () => void;
  onShare: (email: string) => void;
  nameToShare: string;
  setTargetName: (nameToShare: string) => void;
  selectedRepo: any;
}

const ShareRepoModal: React.FC<ShareRepoModalProps> = ({ show, onHide, onShare, nameToShare, setTargetName, selectedRepo }) => {
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
            <Form.Label>User Name</Form.Label>
            <Form.Control type="email" placeholder="Enter target user name" value={nameToShare} onChange={(e) => setTargetName(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onShare(nameToShare)}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return content;
};

export default ShareRepoModal;
