import React, { useState } from "react";
import { availableRecipients, Recipient } from "../data/Recipients";


const EmailManager: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>(availableRecipients);

  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === ""){
        setSuggestions([]);
        return;
    }

    const filteredSuggestions = recipients
      .map(recipient => recipient.domain) 
      .filter((domain, index, self) => self.indexOf(domain) === index) 
      .filter(domain => domain.toLowerCase().startsWith(value.toLowerCase()));  

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);  // Önerileri temizliyoruz
  };


  const handleEmailAdd = (): void => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      <h2>Email Manager</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter email or company name"
      />
      {suggestions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', padding: 0, marginTop: 5 }}>
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
      <button onClick={handleEmailAdd}>Add Email</button>

      <h3>Available Recipients</h3>
      <ul>
        {recipients.map((recipient, index) => (
          <li key={index}>
            {recipient.email}{" "}
            <button onClick={() => handleSelectRecipient(recipient)}>
              Select
            </button>
          </li>
        ))}
      </ul>

      <h3>Available Domains</h3>
      {Array.from(new Set(recipients.map(r => r.domain))).map(
        (domain, index) => (
          <div key={index}>
            {domain}
            <button onClick={() => handleSelectDomain(domain)}>
              Select Domain
            </button>
          </div>
        )
      )}

      <h3>Selected Recipients</h3>
      <ul>
        {selectedRecipients.map((recipient, index) => (
          <li key={index}>
            {recipient.email}{" "}
            <button onClick={() => handleRemoveRecipient(recipient)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Selected Domains</h3>
      <ul>
      {Array.from(new Set(selectedRecipients.map(r => r.domain))).map(
        (domain, index) => (
          <li key={index}>
            {domain}
            <button onClick={() => handleRemoveDomain(domain)}>
              Remove Domain
            </button>
          </li>
        )
      )}
      </ul>
    </div>
  );
};

export default EmailManager;