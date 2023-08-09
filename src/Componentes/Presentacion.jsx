import React from 'react';


export function Presentacion() {
  return (
    
    <><h1>Presentación personal y habilidades de comunicación</h1><div>
          <button type="button" class="btn btn-primary" onclick="alert('Aspecto personal');" id="personal-appearance">Aspecto personal</button>
          <script>
              document.getElementById("personal-appearance").addEventListener("click", function() {alert("Aspecto personal")};
              );
          </script>
      </div></>
    
  );
}
