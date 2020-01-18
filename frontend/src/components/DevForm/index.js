import React from "react";
import "./styles.css";

export default function DevForm({ onSubmit }) {
  const [github_username, setGithub_username] = React.useState("");
  const [techs, setTechs] = React.useState("");
  const [coords, setCoords] = React.useState({ longitude: "", latitude: "" });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      error => {
        alert(
          "Erro desconhecido ao buscar a localizacao. Digite os campos manualmente"
        );
      },
      {
        timeout: 300000
      }
    );
  }, []);

  function handleChange({ target: { name, value } }) {
    setCoords({ ...coords, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      ...coords,
      github_username,
      techs
    });
    setGithub_username("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuario do Github</label>
        <input
          type="text"
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          type="text"
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={coords.latitude}
            onChange={handleChange}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={coords.longitude}
            onChange={handleChange}
          />
        </div>
      </div>
      <button>Salvar</button>
    </form>
  );
}
