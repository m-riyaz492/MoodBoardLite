import { useEffect, useState } from 'react';

export default function GifSearch({ onSelect }) {
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const key = import.meta.env.VITE_GIPHY_KEY;

  const search = async () => {
    const endpoint = q
      ? `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${encodeURIComponent(q)}&limit=12&rating=pg-13`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=12&rating=pg-13`;
    const res = await fetch(endpoint);
    const json = await res.json();
    setItems(json.data || []);
  };

  useEffect(() => { if (key) search(); }, []); // load trending

  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Search GIFs" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={search}>Search</button>
      </div>
      <div className="grid" style={{ marginTop: 12 }}>
        {items.map((g) => (
          <img
            key={g.id}
            src={g.images.fixed_height_small.url}
            alt={g.title}
            style={{ width: '100%', borderRadius: 12, cursor: 'pointer' }}
            onClick={() => onSelect(g.images.original.url)}
          />
        ))}
      </div>
    </div>
  );
}