
// // App.js
// import "./styles.css";
// import React, { useState } from "react";
// import { modules } from "./modules";
// import BackupControls from './BackupControls';

// function App() {
//   const [visitedModulesToday, setVisitedModulesToday] = useState([]);

//   const handleModuleClick = (url, moduleId) => {
//     // просто помечаем в локальном состоянии для подсветки кнопки
//     if (!visitedModulesToday.includes(moduleId)) {
//       setVisitedModulesToday([...visitedModulesToday, moduleId]);
//     }
//     window.open(url, "_blank");
//   };

//   const allModulesVisited = modules.every(mod => visitedModulesToday.includes(mod.id));

//   return (
//     <div className="container">
//       <strong style={{ fontFamily: 'HarryP, sans-serif', fontSize: '48px' }}>
//         ЧТЕНИЕ
//       </strong>

//       <br /><br />

//       <div className="status">
//         {allModulesVisited && (
//           <p>Молодец!</p>
//         )}

//         <div className="module-list">
//           {modules.map((mod) => {
//             const isVisited = visitedModulesToday.includes(mod.id);

//             return (
//               <button
//                 key={mod.id}
//                 className={`module-button ${isVisited ? "visited" : ""}`}
//                 onClick={() => handleModuleClick(mod.url, mod.id)}
//               >
//                 {mod.name}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <BackupControls />
//     </div>
//   );
// }

// export default App;

// App.js
import "./styles.css";
import React, { useState, useEffect } from "react";
import { modules } from "./modules";
import BackupControls from './BackupControls';

const STORAGE_KEY = "todayModuleVisits";

function App() {
  const [visitedModulesToday, setVisitedModulesToday] = useState([]);

  // Получаем сегодняшние посещения из localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const today = new Date().toISOString().split("T")[0];
    setVisitedModulesToday(storedData[today] || []);
  }, []);

  const handleModuleClick = (url, moduleId) => {
    const today = new Date().toISOString().split("T")[0];

    // Обновляем локальное состояние
    const newVisited = visitedModulesToday.includes(moduleId)
      ? visitedModulesToday
      : [...visitedModulesToday, moduleId];

    setVisitedModulesToday(newVisited);

    // Обновляем localStorage
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    storedData[today] = newVisited;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    window.open(url, "_blank");
  };

  const allModulesVisited = modules.every(mod => visitedModulesToday.includes(mod.id));

  return (
    <div className="container">
      <strong style={{ fontFamily: 'HarryP, sans-serif', fontSize: '48px' }}>
        ЧТЕНИЕ
      </strong>

      <br /><br />

      <div className="status">
        {/* {allModulesVisited && (
          <p>Молодец!</p>
        )} */}

        <div className="module-list">
          {modules.map((mod) => {
            const isVisited = visitedModulesToday.includes(mod.id);

            return (
              <button
                key={mod.id}
                className={`module-button ${isVisited ? "visited" : ""}`}
                onClick={() => handleModuleClick(mod.url, mod.id)}
              >
                {mod.name}
              </button>
            );
          })}
        </div>
      </div>

      <BackupControls />
    </div>
  );
}

export default App;