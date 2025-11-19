import React from 'react';

export const VerbTable: React.FC = () => {
  return (
    <div className="my-12 overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
      <h2 className="bg-gray-100 text-2xl font-bold p-6 border-b border-gray-200 text-high-contrast-text">
        Tabela de Terminações
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-800 uppercase tracking-wider sticky left-0 bg-gray-50">Pronome</th>
              <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-800">Présent (Gr 1 -er)</th>
              <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-800">Présent (Gr 2 -ir)</th>
              <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-800">Présent (Gr 3)</th>
              <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-800">Imparfait</th>
              <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-800">Futur Simple</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-lg">
            {[
              { p: "Je", t1: "e", t2: "is", t3: "s", imp: "ais", fut: "ai" },
              { p: "Tu", t1: "es", t2: "is", t3: "s", imp: "ais", fut: "as" },
              { p: "Il/Elle/On", t1: "e", t2: "it", t3: "t", imp: "ait", fut: "a" },
              { p: "Nous", t1: "ons", t2: "issons", t3: "ons", imp: "ions", fut: "ons" },
              { p: "Vous", t1: "ez", t2: "issez", t3: "ez", imp: "iez", fut: "ez" },
              { p: "Ils/Elles", t1: "ent", t2: "issent", t3: "ent", imp: "aient", fut: "ont" },
            ].map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-high-contrast-accent sticky left-0 bg-inherit border-r">{row.p}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.t1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.t2}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.t3}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.imp}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.fut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};