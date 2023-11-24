import React from "react";
function Info() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-violet-400 mb-6">
        My tech stack:
      </h3>
      <ul className="text-2xl font-semibold flex gap-24 mb-12">
        <li>Next.js</li>
        <li>Node.js</li>
        <li>MySQL</li>
        <li>Tailwind</li>
      </ul>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-violet-400 mb-6">
        What else do I use?
      </h3>
      <ul className="text-xl font-semibold flex gap-24">
        <li>Git/Github</li>
        <li>Laravel</li>
        <li>PostgreSQL</li>
        <li>Docker</li>
        <li>Digital Ocean</li>
      </ul>
      <div className="w-full flex justify-evenly py-12"></div>
    </div>
  );
}

export default Info;
