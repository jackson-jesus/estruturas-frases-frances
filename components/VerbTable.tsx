import React from 'react';

const VerbTable: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <h3 className="text-2xl font-bold mb-6 text-center text-primary dark:text-blue-400">
        Tabela de Terminações
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pronome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Présent (Gr 1 -er)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Présent (Gr 2 -ir)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Présent (Gr 3)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Imparfait</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Futur Simple</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-lg">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-primary dark:text-blue-400">Je</td>
              <td className="px-6 py-4 whitespace-nowrap">e</td>
              <td className="px-6 py-4 whitespace-nowrap">is</td>
              <td className="px-6 py-4 whitespace-nowrap">s</td>
              <td className="px-6 py-4 whitespace-nowrap">ais</td>
              <td className="px-6 py-4 whitespace-nowrap">ai</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-primary dark:text-blue-400">Tu</td>
              <td className="px-6 py-4 whitespace-nowrap">es</td>
              <td className="px-6 py-4 whitespace-nowrap">is</td>
              <td className="px-6 py-4 whitespace-nowrap">s</td>
              <td className="px-6 py-4 whitespace-nowrap">ais</td>
              <td className="px-6 py-4 whitespace-nowrap">as</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-primary dark:text-blue-400">Il/Elle/On</td>
              <td className="px-6 py-4 whitespace-nowrap">e</td>
              <td className="px-6 py-4 whitespace-nowrap">it</td>
              <td className="px-6 py-4 whitespace-nowrap">t</td>
              <td className="px-6 py-4 whitespace-nowrap">ait</td>
              <td className="px-6 py-4 whitespace-nowrap">a</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-primary dark:text-blue-400">Nous</td>
              <td className="px-6 py-4 whitespace-nowrap">ons</td>
              <td className="px-6 py-4 whitespace-nowrap">issons</td>
              <td className="px-6 py-4 whitespace-nowrap">ons</td>
              <td className="px-6 py-4 whitespace-nowrap">ions</td>
              <td className="px-6 py-4 whitespace-nowrap">ons</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-primary dark:text-blue-400">Vous</td>
              <td className="px-6 py-4 whitespace-nowrap">ez</td>
              <td className="px-6 py-4 whitespace-nowrap">issez</td>
              <td className="px-6 py-4 whitespace-nowrap">ez</td>
              <td className="px-6 py-4 whitespace-nowrap">iez</td>
              <td className="px-6 py-4 whitespace-nowrap">ez</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-primary dark:text-blue-400">Ils/Elles</td>
              <td className="px-6 py-4 whitespace-nowrap">ent</td>
              <td className="px-6 py-4 whitespace-nowrap">issent</td>
              <td className="px-6 py-4 whitespace-nowrap">ent</td>
              <td className="px-6 py-4 whitespace-nowrap">aient</td>
              <td className="px-6 py-4 whitespace-nowrap">ont</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerbTable;