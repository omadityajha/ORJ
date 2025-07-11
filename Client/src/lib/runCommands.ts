
export const extensionCommandMap: Record<string, (path: string) => string> = {
  js: (path) => `node "${path}"`,
  ts: (path) => `ts-node "${path}"`,
  py: (path) => `python "${path}"`,
  sh: (path) => `bash "${path}"`,
  c: (path) => `gcc "${path}" -o out && ./out`,
  cpp: (path) => `g++ "${path}" -o out && ./out`,
  java: (path) => {
    const className = path.split('/').pop()?.replace('.java', '') || 'Main';
    return `javac "${path}" && java "${className}"`;
  },
  go: (path) => `go run "${path}"`,
  rs: (path) => `rustc "${path}" && ./$(basename "${path}" .rs)`,
  php: (path) => `php "${path}"`,
  rb: (path) => `ruby "${path}"`,
};