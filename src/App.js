

// // App.js
// import "./styles.css";
// import React, { useState, useEffect } from "react";
// import { modules } from "./modules";
// import {
//   markTodayVisited,
//   getDaysCount,
//   getVisitedDays,
//   getTodayVisitedModules,
//   markModuleVisitedToday
// } from "./storage";
// import BackupControls from './BackupControls';

// function App() {
//   const [daysCount, setDaysCount] = useState(0);
//   const [visitedModulesToday, setVisitedModulesToday] = useState([]);

//   useEffect(() => {
//     const visited = getVisitedDays();
//     setDaysCount(visited.length);
//     setVisitedModulesToday(getTodayVisitedModules());
//   }, []);

//   const handleModuleClick = (url, moduleId) => {
//     markTodayVisited();
//     markModuleVisitedToday(moduleId);
//     setDaysCount(getDaysCount());
//     setVisitedModulesToday(getTodayVisitedModules());
//     window.open(url, "_blank");
//   };

//   const allModulesVisited = modules.every(mod => visitedModulesToday.includes(mod.id));

//   // Просто берем порядок из modules.js
//   const modulesColumnWise = modules;

//   return (
//     <div className="container">
//       <strong style={{ fontFamily: 'HarryP, sans-serif', fontSize: '48px' }}>
//         ЧТЕНИЕ
//       </strong>

//       <br /><br />

//       <div className="status">
//         {allModulesVisited && (
//           <p>{daysCount} days</p>
//         )}

//         <div className="module-list">
//           {modulesColumnWise.map((mod) => {
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
import React, { useState } from "react";
import { modules } from "./modules";
import BackupControls from './BackupControls';

function App() {
  const [visitedModulesToday, setVisitedModulesToday] = useState([]);

  const handleModuleClick = (url, moduleId) => {
    // просто помечаем в локальном состоянии для подсветки кнопки
    if (!visitedModulesToday.includes(moduleId)) {
      setVisitedModulesToday([...visitedModulesToday, moduleId]);
    }
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
        {allModulesVisited && (
          <p>Молодец!</p>
        )}

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