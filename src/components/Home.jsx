import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Lock, Users, Settings, Plus, Trash2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_CANDIDATES = [
    "Alba Monje Oswaldo",
    "Arteaga Melendez Adriano",
    "Beyuma Vaca Andrea Brivith",
    "Gonzales Rojas Guido Alejandro",
    "Mamani Cocarico Jherson Jose",
    "Mosqueira Cayo Jack Heider",
    "Mendoza Chavez Jose Gabriel",
    "Ramirez Duran Ruben Caleb",
    "Rodriguez Oliver Fernando Jesus",
    "Rojas Habu Guery Fernando",
    "Saucedo Soto Luis Alberto",
    "Sendoya Alvarez Rossana",
    "Tarqui Quispe Roberto Carlos",
    "Tito Gironda Nelson Edwin",
    "Velarde Rodríguez Maithe",
    "Villarroel Cespedes Briana Yudith"
];

function Home({ onLogout }) {
    const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
    const [formedGroups, setFormedGroups] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [newName, setNewName] = useState('');

    const handleSelectGroup = () => {
        if (candidates.length < 3) {
            alert("No hay suficientes candidatos para formar un grupo de 3.");
            return;
        }

        // Shuffle and pick 3
        const shuffled = [...candidates].sort(() => 0.5 - Math.random());
        const newGroupMembers = shuffled.slice(0, 3);
        const remainingCandidates = shuffled.slice(3);

        const newGroup = {
            id: formedGroups.length + 1,
            members: newGroupMembers
        };

        setFormedGroups([newGroup, ...formedGroups]); // Add to top
        setCandidates(remainingCandidates);
    };

    const handleReset = () => {
        // Restore all candidates from formed groups + current candidates
        const allMembers = formedGroups.flatMap(g => g.members);
        setCandidates([...candidates, ...allMembers].sort());
        setFormedGroups([]);
    };

    const handleAddCandidate = (e) => {
        e.preventDefault();
        if (newName.trim() && !candidates.includes(newName.trim())) {
            setCandidates([...candidates, newName.trim()]);
            setNewName('');
        }
    };

    const handleRemoveCandidate = (nameToRemove) => {
        setCandidates(candidates.filter(name => name !== nameToRemove));
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm sticky-top">
                <Container>
                    <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-100/50 shadow-inner">
                            <Lock className="w-6 h-6 text-indigo-600" />
                        </div>
                        <span className="fw-bold text-indigo-900">System</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        {/* Centered Buttons */}
                        <Nav className="mx-auto my-2 my-lg-0 d-flex gap-2 align-items-center">
                            <Button
                                variant="primary"
                                className="px-4 py-2 rounded-pill bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all shadow-md d-flex align-items-center gap-2"
                                onClick={handleSelectGroup}
                                disabled={candidates.length < 3}
                            >
                                <Users size={18} />
                                <span>Seleccionar Grupo ({Math.floor(candidates.length / 3)} restantes)</span>
                            </Button>

                            {formedGroups.length > 0 && (
                                <Button
                                    variant="outline-danger"
                                    className="px-3 py-2 rounded-pill border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all d-flex align-items-center gap-2"
                                    onClick={handleReset}
                                    title="Reiniciar y devolver todos a la lista"
                                >
                                    <RotateCcw size={18} />
                                </Button>
                            )}

                            <Button
                                variant="outline-secondary"
                                className="px-3 py-2 rounded-pill border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all d-flex align-items-center gap-2"
                                onClick={() => setShowSettings(true)}
                            >
                                <Settings size={18} />
                            </Button>
                        </Nav>

                        {/* Right Side Menu */}
                        <Nav>
                            <NavDropdown title="Usuario" id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Configuración</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLogout} className="text-danger">
                                    Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-gray-800 mb-2">Grupos Formados</h1>
                    <p className="lead text-muted">
                        Candidatos disponibles: <span className="fw-bold text-indigo-600">{candidates.length}</span>
                    </p>
                </div>

                <Row className="g-4">
                    {/* Newest groups first */}
                    <AnimatePresence>
                        {formedGroups.map((group) => (
                            <Col key={group.id} xs={12} md={6} lg={4}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    layout
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden h-100">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0 fw-bold">Grupo {group.id}</h5>
                                            <Badge bg="white" text="dark" pill>3 Miembros</Badge>
                                        </div>
                                        <Card.Body className="p-0">
                                            <ListGroup variant="flush">
                                                {group.members.map((member, idx) => (
                                                    <ListGroup.Item key={idx} className="d-flex align-items-center gap-3 py-3 px-4 border-b-gray-50">
                                                        <div className="flex-shrink-0 w-8 h-8 rounded-circle bg-indigo-50 text-indigo-600 flex items-center justify-center fw-bold border border-indigo-100">
                                                            {idx + 1}
                                                        </div>
                                                        <span className="fw-medium text-gray-700">{member}</span>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </AnimatePresence>
                </Row>

                {formedGroups.length === 0 && (
                    <div className="p-5 bg-light rounded-3 mt-4 border border-indigo-50 text-center opacity-50">
                        <Users size={48} className="mx-auto mb-3 text-gray-300" />
                        <p>No se han formado grupos aún.</p>
                    </div>
                )}
            </Container>

            {/* Settings Modal */}
            <Modal show={showSettings} onHide={() => setShowSettings(false)} centered scrollable>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-gray-800">Gestionar Candidatos</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form onSubmit={handleAddCandidate} className="mb-4">
                        <InputGroup>
                            <Form.Control
                                placeholder="Nombre del nuevo candidato"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="shadow-none border-indigo-200 focus:border-indigo-400 focus:ring-indigo-100"
                            />
                            <Button variant="primary" type="submit" className="bg-indigo-600 border-indigo-600 hover:bg-indigo-700">
                                <Plus size={20} />
                            </Button>
                        </InputGroup>
                    </Form>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Disponibles ({candidates.length})</small>
                    </div>

                    <ListGroup variant="flush" className="rounded-2 overflow-hidden border border-gray-100">
                        {candidates.length === 0 ? (
                            <div className="p-4 text-center text-muted bg-light">
                                No hay candidatos disponibles.
                            </div>
                        ) : (
                            candidates.map((candidate, idx) => (
                                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center py-3 hover:bg-gray-50 transition-colors">
                                    <span className="fw-medium text-gray-700">{candidate}</span>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="text-danger p-1 hover:bg-red-50 rounded-circle"
                                        onClick={() => handleRemoveCandidate(candidate)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="secondary" onClick={() => setShowSettings(false)} className="rounded-pill px-4">
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Home;
