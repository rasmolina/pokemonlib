import { useState } from "react";
import './Sidebar.css';

const navItems = ["cadastrar", "sair"];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
        <header className="sidebar-header">
          <button
            type="button"
            className="sidebar-burger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">
              {isOpen ? "fechar" : "menu"}
            </span>
          </button>
          <img
            src={process.env.PUBLIC_URL + '/ballIcon.png'}
            alt="Sair"
            width="40"
            height="40"
          />
        </header>
        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <button key={item} type="button" className="sidebar-button">
              <span className="material-symbols-outlined">{item}</span>
              <p>{item}</p>
            </button>
          ))}
        </nav>
      </div>
    </nav>
  );
};