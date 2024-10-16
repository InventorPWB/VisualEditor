export function getIconFromFileType({ fileName }: { fileName: string }) {
  const re = /(?:\.([^.]+))?$/;
  const match = re.exec(fileName);
  const extension = match ? match[1] : null;
  
  switch (extension) {
    case 'js':
      return 'https://static-00.iconduck.com/assets.00/javascript-js-icon-2048x2048-nyxvtvk0.png';
    case 'html':
      return 'https://static-00.iconduck.com/assets.00/html-5-icon-224x256-1b5ud2sy.png';
    case 'css':
      return 'https://cdn.iconscout.com/icon/free/png-256/free-css3-logo-icon-download-in-svg-png-gif-file-formats--css-programming-langugae-language-pack-logos-icons-1175237.png';
  }
  
  return '/unknown.png';
}


export function getFileExtension({ fileName }: { fileName: string }) {
  const re = /(?:\.([^.]+))?$/;
  const match = re.exec(fileName);
  const extension = match ? match[1] : null;

  switch (extension) {
    case 'js':
      return 'javascript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
  }
  return 'text';
}