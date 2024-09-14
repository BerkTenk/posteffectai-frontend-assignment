import React, { useState } from "react";
import { Container, Row, Col, Form, ListGroup, FormGroup, FormLabel } from "react-bootstrap";
import { availableRecipients, Recipient } from "../data/Recipients";


const EmailManager: React.FC = () => {
    const [recipients, setRecipients] = useState<Recipient[]>(availableRecipients);
    const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    // const [inputValueRecipients, setInputValueRecipients] = useState<string>("");
    // const [suggestionsRecipients, setSuggestionsRecipients] = useState<string[]>([]);
    const [inputValueDomains, setInputValueDomains] = useState<string>("");
    const [suggestionsDomains, setSuggestionsDomains] = useState<string[]>([]);
    const [inputValueSelectedRecs, setInputValueSelectedRecs] = useState<string>("");
    const [suggestionsSelectedRecs, setSuggestionsSelectedRecs] = useState<string[]>([]);
    const [inputValueSelectedDoms, setInputValueSelectedDoms] = useState<string>("");
    const [suggestionsSelectedDoms, setSuggestionsSelectedDoms] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === "") {
            setSuggestions([]);
            return;
        }

        const filteredSuggestions = recipients
            .map(recipient => recipient.email)
            .filter((email, index, self) => self.indexOf(email) === index)
            .filter(email => email.toLowerCase().startsWith(value.toLowerCase()));

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setSuggestions([]);
    };

    const sortedRecipients = recipients.sort((a, b) => {
        const companyA = a.email.split("@")[1].toLowerCase();
        const companyB = b.email.split("@")[1].toLowerCase();
        return companyA.localeCompare(companyB);
    })

    const handleEmailAdd = (): void => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailExists = recipients.some(recipient => recipient.email === inputValue);
        if (isEmailExists) {
            alert("Bu e-posta zaten mevcut");
            return;
        }
        if (emailPattern.test(inputValue)) {
            setRecipients(prev => [
                ...prev,
                { email: inputValue, domain: inputValue.split("@")[1] }
            ]);
            setInputValue("");
        } else {
            alert("Geçersiz e-posta formatı");
        }
    };

    // const handleInputChangeRecipients = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     setInputValueRecipients(value);
    //     if (value === "") {
    //         setSuggestionsRecipients([]);
    //         return;
    //     }

    //     const filteredSuggestions = recipients
    //         .map(recipient => recipient.email)
    //         .filter((email, index, self) => self.indexOf(email) === index)
    //         .filter(email => email.toLowerCase().startsWith(value.toLowerCase()));

    //     setSuggestionsRecipients(filteredSuggestions);
    // };

    const handleSuggestionClickDomains = (suggestion: string) => {
        setInputValueDomains(suggestion);
        const selectedDomain = recipients.find(r => r.domain === suggestion);
        if (selectedDomain && !selectedRecipients.find(r => r.domain === selectedDomain.domain)) {
            setSelectedRecipients([...selectedRecipients, selectedDomain]);
        }

        setSuggestionsDomains([]);
    };


    const handleInputChangeDomains = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValueDomains(value);
        if (value === "") {
            setSuggestionsDomains([]);
            return;
        }

        const filteredSuggestions = recipients
            .map(recipient => recipient.domain)
            .filter((domain, index, self) => self.indexOf(domain) === index)
            .filter(domain => domain.toLowerCase().startsWith(value.toLowerCase()));

        setSuggestionsDomains(filteredSuggestions);
    };

    const handleInputChangeSelectedRecipients = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValueSelectedRecs(value);
        if (value === "") {
            setSuggestionsSelectedRecs([]);
            return;
        }

        const filteredSuggestions = selectedRecipients
            .map(recipient => recipient.email)
            .filter((email, index, self) => self.indexOf(email) === index)
            .filter(email => email.toLowerCase().startsWith(value.toLowerCase()));

        setSuggestionsSelectedRecs(filteredSuggestions);
    };

    const handleSuggestionClickSelectedRecipients = (suggestion: string) => {
        setInputValueSelectedRecs(suggestion);
        setSuggestionsSelectedRecs([]);
    };


    const handleInputChangeSelectedDomains = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValueSelectedDoms(value);
        if (value === "") {
            setSuggestionsSelectedDoms([]);
            return;
        }

        const filteredSuggestions = Array.from(new Set(selectedRecipients.map(r => r.domain)))
            .filter(domain => domain.toLowerCase().startsWith(value.toLowerCase()));

        setSuggestionsSelectedDoms(filteredSuggestions);
    };

    const handleSuggestionClickSelectedDomains = (suggestion: string) => {
        setInputValueSelectedDoms(suggestion);
        setSuggestionsSelectedDoms([]);
    };

    const handleSelectRecipient = (recipient: Recipient): void => {
        if (!selectedRecipients.find(r => r.email === recipient.email)) {
            setSelectedRecipients([...selectedRecipients, recipient]);
        }
    };

    const handleSelectDomain = (domain: string): void => {
        const domainRecipients = recipients.filter(r => r.domain === domain);
        const newSelected = domainRecipients.filter(r => !selectedRecipients.includes(r));
        setSelectedRecipients([...selectedRecipients, ...newSelected]);
    };

    const handleRemoveRecipient = (recipient: Recipient): void => {
        setSelectedRecipients(selectedRecipients.filter(r => r.email !== recipient.email));
    };

    const handleRemoveDomain = (domain: string): void => {
        setSelectedRecipients(selectedRecipients.filter(r => r.domain !== domain));
    };



    return (
        <div>
            <h2>Posteffect AI Frontend Assignment</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter An Email"
            />
            {suggestions.length > 0 && (
                <ul style={{ border: '1px solid #ccc', padding: 0, marginTop: 5, maxWidth:"600px", marginInline:"auto" }}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ cursor: 'pointer', padding: '5px', listStyleType: 'none' }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <button className="ms-2 btn btn-primary rounded-pill" onClick={handleEmailAdd}>Add Email</button>
            <Container>
                <Row className="mt-4">
                    <Col
                        xs={12}
                        md={{ span: 5, offset: 1 }}
                        className="border border-2 border-grey pt-2 rounded shadow p-3 mb-5 bg-white rounded"
                    >
                        <FormGroup>
                            <FormLabel>Search in Available Email Recipients and Companies</FormLabel>
                            <Form.Control
                                style={{ maxWidth: "fit-content", marginLeft: "auto", marginRight: "auto" }}
                                type="text"
                                value={inputValueDomains}
                                onChange={handleInputChangeDomains}
                                placeholder="Search Email or Company"
                            />
                            {suggestionsDomains.length > 0 && (
                                <ListGroup>
                                    {suggestionsDomains.map((suggestion, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            action
                                            onClick={() => handleSuggestionClickDomains(suggestion)}
                                        >
                                            {suggestion}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </FormGroup>

                        <h3>Available Recipients by Company</h3>
                        <ul>
                            {Array.from(new Set(sortedRecipients.map((r) => r.domain))).map((domain, index) => (
                                <div key={index} className="my-3">
                                    <strong>{domain}</strong>
                                    <ul>
                                        {sortedRecipients
                                            .filter((recipient) => recipient.domain === domain)
                                            .map((recipient, subIndex) => (
                                                <li className="d-flex justify-content-between my-2" key={subIndex}>
                                                    {recipient.email}
                                                    <button
                                                        className="btn btn-success btn-sm my-1"
                                                        onClick={() => handleSelectRecipient(recipient)}
                                                    >
                                                        Select Email
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                    <button
                                        className="btn btn-primary btn-sm my-2 "
                                        onClick={() => handleSelectDomain(domain)}
                                    >
                                        Select Domain
                                    </button>
                                </div>
                            ))}
                        </ul>
                    </Col>


                    <Col xs={12} md={{ span: 5, offset: 1 }} className="border border-2 border-grey pt-2 rounded shadow p-3 mb-5 bg-white rounded" >
                        <FormGroup>
                            <FormLabel>Search in Selected Email Recipients</FormLabel>
                            <Form.Control
                                style={{ maxWidth: "fit-content", marginLeft: "auto", marginRight: "auto" }}
                                type="text"
                                value={inputValueSelectedRecs}
                                onChange={handleInputChangeSelectedRecipients}
                                placeholder="Search An Email" />
                            {suggestionsSelectedRecs.length > 0 && (
                                <ListGroup className="mb-4 min-vh-25">
                                    {suggestionsSelectedRecs.map((suggestion, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            action
                                            onClick={() => handleSuggestionClickSelectedRecipients(suggestion)}
                                        >
                                            {suggestion}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}

                        </FormGroup>
                        <h3>Selected Email Recipients</h3>
                        <ul>
                            {selectedRecipients.map((recipient, index) => (
                                <li className="d-flex justify-content-between my-2" key={index}>
                                    {recipient.email}{" "}
                                    <button className="btn btn-danger m-1" onClick={() => handleRemoveRecipient(recipient)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>


                        <FormGroup className="mt-4 pt-4 ">
                            <FormLabel>Search in Selected Companies</FormLabel>
                            <Form.Control
                                style={{ maxWidth: "fit-content", marginLeft: "auto", marginRight: "auto" }}
                                type="text"
                                value={inputValueSelectedDoms}
                                onChange={handleInputChangeSelectedDomains}
                                placeholder="Search A Company Name " />
                            {suggestionsSelectedDoms.length > 0 && (
                                <ListGroup>
                                    {suggestionsSelectedDoms.map((suggestion, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            action
                                            onClick={() => handleSuggestionClickSelectedDomains(suggestion)}
                                        >
                                            {suggestion}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}

                        </FormGroup>
                        <h3>Selected Company Recipients</h3>
                        <ul>
                            {Array.from(new Set(selectedRecipients.map(r => r.domain))).map(
                                (domain, index) => (
                                    <li className="d-flex justify-content-between my-2" key={index}>
                                        {domain}
                                        <button className="btn btn-danger m-1" onClick={() => handleRemoveDomain(domain)}>
                                            Remove Domain
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EmailManager;