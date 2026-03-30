import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>
        © {currentYear} <strong>Devanshukoli</strong> •{' '}
        <a 
          href="https://github.com/Devanshukoli/resource-stack" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </p>
    </footer>
  )
}

export default Footer
