import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AddTechnology() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const saved = localStorage.getItem('technologies');
    const technologies = saved ? JSON.parse(saved) : [];
    const nextId = technologies.length > 0 ? technologies[technologies.length - 1].id + 1 : 1;

    const newTech = {
      id: nextId,
      title: title.trim(),
      description: description.trim(),
      status: 'not-started'
    };

    const updated = [...technologies, newTech];
    localStorage.setItem('technologies', JSON.stringify(updated));
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Название технологии *</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, React, TypeScript, Node.js"
          />
        </label>
        <label className="form-field">
          <span>Краткое описание</span>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Для чего вы хотите изучить эту технологию"
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;


