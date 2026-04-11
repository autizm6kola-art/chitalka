import React from 'react';
import { exportProgress, importProgress } from './storage';

function BackupControls() {
  const buttonStyle = {
    padding: '10px 18px',
    borderRadius: '999px',
    border: '1px solid #bbb',
    background: '#f5f5f5',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background 0.2s, box-shadow 0.2s',
  };

  const hoverStyle = {
    background: '#eaeaea',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  };

  const [hovered, setHovered] = React.useState(null);

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chitalka_backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        importProgress(data);
        window.location.reload();
      } catch (err) {
        alert('Ошибка загрузки файла');
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <button
        style={{
          ...buttonStyle,
          ...(hovered === 'save' ? hoverStyle : {}),
        }}
        onMouseEnter={() => setHovered('save')}
        onMouseLeave={() => setHovered(null)}
        onClick={handleExport}
      >
        Сохранить
      </button>

      <label
        style={{
          ...buttonStyle,
          ...(hovered === 'load' ? hoverStyle : {}),
          display: 'inline-block',
        }}
        onMouseEnter={() => setHovered('load')}
        onMouseLeave={() => setHovered(null)}
      >
        Загрузить
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}

export default BackupControls;
