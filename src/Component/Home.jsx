import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const plants = [
    {
      name: "Monstera Deliciosa",
      care: "Water every 1-2 weeks, bright indirect light"
    },
    {
      name: "Snake Plant",
      care: "Water every 2-6 weeks, low to bright light"
    },
    {
      name: "Pothos",
      care: "Water every 1-2 weeks, any light conditions"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlantIndex((prevIndex) => (prevIndex + 1) % plants.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [plants.length]);

  return (
    <div style={styles.homeContainer}>
      {/* Overlay for better text readability */}
      <div style={styles.overlay}></div>
      
      {/* Header */}
      <header style={styles.homeHeader}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>
            <i className="fas fa-leaf" style={styles.logoIcon}></i> PlantPal
          </h1>
          <nav style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/features" style={styles.navLink}>Features</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
            <Link to="/login" style={styles.loginBtn}>Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>Never Forget to Water Your Plants Again</h1>
            <p style={styles.heroDescription}>PlantPal helps you care for your plants with smart reminders, identification tools, and personalized care guides.</p>
            <div style={styles.heroButtons}>
              <Link to="/register" style={styles.primaryBtn}>Get Started</Link>
              <Link to="/identify" style={styles.secondaryBtn}>Identify a Plant</Link>
            </div>
          </div>
          <div style={styles.heroImage}>
            <div style={styles.plantCard}>
              <div style={styles.plantImage}>
                <i className="fas fa-seedling" style={styles.plantIcon}></i>
              </div>
              <div style={styles.plantInfo}>
                <h3 style={styles.plantName}>{plants[currentPlantIndex].name}</h3>
                <p style={styles.plantCare}>{plants[currentPlantIndex].care}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose PlantPal?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <i className="fas fa-bell"></i>
            </div>
            <h3 style={styles.featureTitle}>Smart Reminders</h3>
            <p style={styles.featureDescription}>Get personalized notifications for watering, fertilizing, and other plant care tasks.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <i className="fas fa-camera"></i>
            </div>
            <h3 style={styles.featureTitle}>Plant Identification</h3>
            <p style={styles.featureDescription}>Identify unknown plants instantly with our AI-powered recognition technology.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <i className="fas fa-book"></i>
            </div>
            <h3 style={styles.featureTitle}>Care Guides</h3>
            <p style={styles.featureDescription}>Access detailed care instructions for thousands of plant species.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to become a plant expert?</h2>
        <p style={styles.ctaDescription}>Join thousands of plant lovers who use PlantPal to keep their plants thriving</p>
        <Link to="/signup" style={styles.ctaBtn}>Create Your Free Account</Link>
      </section>

      {/* Footer */}
      <footer style={styles.homeFooter}>
        <p style={styles.footerText}>&copy; 2023 PlantPal. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
          <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
          <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};

// All styles as JavaScript objects
const styles = {
  homeContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    lineHeight: 1.6,
    // Background image with plant theme
    backgroundImage: "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    position: "relative"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    zIndex: 0
  },
  
  // Header Styles
  homeHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem 0",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  headerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    zIndex: 2
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#2E7D32",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  logoIcon: {
    fontSize: "2rem"
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center"
  },
  navLink: {
    textDecoration: "none",
    color: "#555",
    fontWeight: 500,
    transition: "color 0.3s",
    position: "relative",
    zIndex: 2
  },
  loginBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background-color 0.3s",
    position: "relative",
    zIndex: 2
  },
  
  // Hero Section
  heroSection: {
    padding: "4rem 2rem",
    flex: 1,
    position: "relative",
    zIndex: 1
  },
  heroContent: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "3rem",
    position: "relative",
    zIndex: 2
  },
  heroText: {
    flex: 1
  },
  heroTitle: {
    fontSize: "2.8rem",
    color: "#2E7D32",
    marginBottom: "1.5rem",
    lineHeight: 1.2
  },
  heroDescription: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "2rem"
  },
  heroButtons: {
    display: "flex",
    gap: "1rem"
  },
  primaryBtn: {
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "all 0.3s",
    display: "inline-block",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    position: "relative",
    zIndex: 2
  },
  secondaryBtn: {
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "all 0.3s",
    display: "inline-block",
    backgroundColor: "transparent",
    color: "#4CAF50",
    border: "2px solid #4CAF50",
    position: "relative",
    zIndex: 2
  },
  heroImage: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: 2
  },
  plantCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    padding: "2rem",
    width: "300px",
    textAlign: "center",
    transition: "transform 0.5s",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(46, 125, 50, 0.2)"
  },
  plantImage: {
    fontSize: "4rem",
    color: "#4CAF50",
    marginBottom: "1.5rem"
  },
  plantIcon: {
    fontSize: "4rem"
  },
  plantInfo: {
    marginTop: "1rem"
  },
  plantName: {
    color: "#2E7D32",
    marginBottom: "0.5rem"
  },
  plantCare: {
    color: "#666"
  },
  
  // Features Section
  featuresSection: {
    padding: "5rem 2rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "relative",
    zIndex: 1
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "2.2rem",
    color: "#2E7D32",
    marginBottom: "3rem",
    position: "relative",
    zIndex: 2
  },
  featuresGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    position: "relative",
    zIndex: 2
  },
  featureCard: {
    textAlign: "center",
    padding: "2rem",
    borderRadius: "12px",
    backgroundColor: "rgba(248, 250, 248, 0.9)",
    transition: "transform 0.3s",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(46, 125, 50, 0.1)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
  },
  featureIcon: {
    fontSize: "2.5rem",
    color: "#4CAF50",
    marginBottom: "1.5rem"
  },
  featureTitle: {
    color: "#2E7D32",
    marginBottom: "1rem"
  },
  featureDescription: {
    color: "#666"
  },
  
  // CTA Section
  ctaSection: {
    padding: "5rem 2rem",
    background: "linear-gradient(135deg, rgba(232, 245, 233, 0.9) 0%, rgba(248, 250, 248, 0.9) 100%)",
    textAlign: "center",
    position: "relative",
    zIndex: 1
  },
  ctaTitle: {
    fontSize: "2.2rem",
    color: "#2E7D32",
    marginBottom: "1rem",
    position: "relative",
    zIndex: 2
  },
  ctaDescription: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "2rem",
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    zIndex: 2
  },
  ctaBtn: {
    padding: "1rem 2rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "all 0.3s",
    display: "inline-block",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    fontSize: "1.1rem",
    position: "relative",
    zIndex: 2
  },
  
  // Footer
  homeFooter: {
    backgroundColor: "rgba(46, 125, 50, 0.9)",
    color: "white",
    padding: "2rem",
    textAlign: "center",
    position: "relative",
    zIndex: 1
  },
  footerText: {
    marginBottom: "1rem",
    position: "relative",
    zIndex: 2
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    position: "relative",
    zIndex: 2
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
    transition: "opacity 0.3s"
  }
};

// Add hover effects via JavaScript
const addHoverEffects = () => {
  // This would typically be done with CSS, but for inline styles we can use JavaScript
  // In a real app, you might use a CSS-in-JS solution or separate CSS file for hover states
  const style = document.createElement('style');
  style.textContent = `
    a:hover {
      opacity: 0.8;
    }
    
    .nav-links a:hover {
      color: #2E7D32;
    }
    
    .login-btn:hover {
      background-color: #2E7D32;
    }
    
    .btn.primary:hover {
      background-color: #2E7D32;
      transform: translateY(-2px);
    }
    
    .btn.secondary:hover {
      background-color: #4CAF50;
      color: white;
      transform: translateY(-2px);
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .plant-card:hover {
      transform: translateY(-5px);
    }
    
    .footer-links a:hover {
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);
};

// Call the function to add hover effects
addHoverEffects();

export default Home;