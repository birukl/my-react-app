import { useState } from "react";

interface CodeRunnerProps {
  initialCode?: string;
}

export function CodeRunner({ initialCode = "console.log('Hello World!');" }: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState("");

  const runCode = () => {
    setOutput([]);
    setError("");
    
    // Capture console.log
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(" "));
      originalLog(...args);
    };

    try {
      // Create a function from the code string
      const func = new Function(code);
      func();
      setOutput(logs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      console.log = originalLog;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <span className="text-sm">🔧 JavaScript Runner</span>
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
        >
          Run ▶
        </button>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-4 font-mono text-sm bg-gray-900 text-white focus:outline-none"
        rows={8}
        spellCheck={false}
      />
      
      {(output.length > 0 || error) && (
        <div className="bg-black p-4 font-mono text-sm">
          {output.map((line, i) => (
            <div key={i} className="text-green-400">→ {line}</div>
          ))}
          {error && (
            <div className="text-red-400">❌ Error: {error}</div>
          )}
        </div>
      )}
    </div>
  );
}