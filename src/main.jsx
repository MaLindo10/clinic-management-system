import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ArrowIcon, EnglishIcon, IsiZuluIcon } from "./icons";
import "./main.css";

export function App() {
  const [activeNav, setActiveNav] = useState(0);
  const [language, setLanguage] = useState(null);
  const [authView, setAuthView] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [registration, setRegistration] = useState({
    firstName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    cellphone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [login, setLogin] = useState({ identifier: "", password: "", remember: false });

  const translations = {
    en: {
      nav: ["Home", "Register", "Log in", "About"],
      welcome: "Welcome to",
      tagline: "Quality care, closer to you.",
      subtitle: "Bilingual Appointment and Walk-in Management System",
      accessMessage: "Your health. Our care. Our community.",
      trustIndicator: "Simple • Accessible",
      chooseLanguage: "Choose your preferred language",
      actionHeading: "What can I do",
      bookAppointment: "Book an Appointment",
      bookAppointmentDesc: "Plan your clinic visit.",
      walkInQueue: "Join the Walk-in Queue",
      walkInQueueDesc: "Check in without waiting unnecessarily.",
      checkVisit: "Check My Visit",
      checkVisitDesc: "View your appointment or queue status.",
      zuluSub: "Qhubekela ngesiZulu",
      englishSub: "Proceed in English",
      confirmation: "Continuing in English...",
      zuluName: "IsiZulu",
      englishName: "English",
      clinicPortal: "Clinic portal",
      createAccount: "Create your account",
      name: "Name",
      firstName: "First name",
      surname: "Surname",
      dateOfBirth: "Date of birth",
      gender: "Gender",
      selectGender: "Select gender",
      emailAddress: "Email address",
      emailOrCellphone: "Email or cellphone",
      cellphone: "Cellphone",
      password: "Password",
      confirmPassword: "Confirm password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      terms: "I agree to the Terms and Conditions and Privacy Notice",
      register: "Register",
      login: "Log in",
      registrationSuccess: "Registration complete. You can now log in.",
      passwordMismatch: "Passwords do not match.",
      invalidLogin: "The email/cellphone or password is incorrect.",
      welcomeBack: "Welcome back",
      alreadyRegistered: "Already registered? Log in",
      needAccount: "Need an account? Register",
      secureAccess: "Secure access to your clinic services",
      features: ["Community Focused", "Bilingual Access", "Secure & Private"],
      footerMessage: "Healthcare made simpler for our community.",
      footerLinks: ["Privacy", "Accessibility", "Help"],
      needHelp: "Need help?",
      helpAssistance: "Contact the clinic reception for assistance.",
    },
    zu: {
      nav: ["Ikhaya", "Bhalisa", "Ngena", "Mayelana"],
      welcome: "Siyakwamukela e-",
      tagline: "Ukunakekelwa okuhle, kufuphi newe.",
      subtitle: "Ukufinyelela kwezempilo ngesizulu nesiNgisi e-KwaDlangezwa.",
      accessMessage: "Impilo yakho. Ukunakekelwa kwethu. Umphakathi wathu.",
      trustIndicator: "Lula • Okufinyeleka",
      chooseLanguage: "Khetha ulimi oluthandayo",
      actionHeading: "Ungenzani",
      bookAppointment: "Bhalisa i-Appointment",
      bookAppointmentDesc: "Hlela isiyali sakho sokuthutha.",
      walkInQueue: "Joyina i-Walk-in Queue",
      walkInQueueDesc: "Ngena ngaphandle kokuhlala isikhathi.",
      checkVisit: "Hlola I-Visit Yami",
      checkVisitDesc: "Buka i-appointment yakho noma isthathu se-queue.",
      zuluSub: "Qhubekela ngesiZulu",
      englishSub: "Qhubeka ngesiNgisi",
      confirmation: "Uqhubeka ngesiZulu...",
      zuluName: "IsiZulu",
      englishName: "IsiNgisi",
      clinicPortal: "Ingosi yomtholampilo",
      createAccount: "Dala i-akhawunti yakho",
      name: "Igama",
      firstName: "Igama",
      surname: "Isibongo",
      dateOfBirth: "Usuku lokuzalwa",
      gender: "Ubulili",
      selectGender: "Khetha ubulili",
      emailAddress: "Ikheli le-imeyili",
      emailOrCellphone: "I-imeyili noma umakhalekhukhwini",
      cellphone: "Umakhalekhukhwini",
      password: "Iphasiwedi",
      confirmPassword: "Qinisekisa iphasiwedi",
      rememberMe: "Khumbula mina",
      forgotPassword: "Ukhohlwe iphasiwedi?",
      terms: "Ngiyavuma iMibandela kanye Nesaziso Sobumfihlo",
      register: "Bhalisa",
      login: "Ngena",
      registrationSuccess: "Ukubhalisa kuqediwe. Manje ungangena.",
      passwordMismatch: "Amaphasiwedi awafani.",
      invalidLogin: "I-imeyili/umakhalekhukhwini noma iphasiwedi ayilungile.",
      welcomeBack: "Siyakwamukela futhi",
      alreadyRegistered: "Usubhalisile? Ngena",
      needAccount: "Udinga i-akhawunti? Bhalisa",
      secureAccess: "Ukufinyelela okuphephile ezinsizeni zomtholampilo",
      features: ["Umphakathi", "Izilimi ezimbili", "Kuphephile futhi kuyimfihlo"],
      footerMessage: "Ukunakekelwa kwezempilo kwenziwe lula emphakathini wethu.",
      footerLinks: ["Ubumfihlo", "Ukufinyeleleka", "Usizo"],
      needHelp: "Udinga usizo?",
      helpAssistance: "Xhumana nenhansela ye-clinic reception ngesisekelo.",
    },
  };

  const currentLanguage = translations[language] || translations.en;
  const navItems = currentLanguage.nav;

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
  };

  const openAuthView = (view) => {
    setActiveNav(view === "register" ? 1 : 2);
    setAuthView(view);
    setAuthMessage("");
  };

  const goHome = () => {
    setActiveNav(0);
    setAuthView(null);
    setAuthMessage("");
    setLanguage(null);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (registration.password !== registration.confirmPassword) {
      setAuthMessage(currentLanguage.passwordMismatch);
      return;
    }

    localStorage.setItem("clinicAccount", JSON.stringify({
      name: `${registration.firstName.trim()} ${registration.surname.trim()}`,
      firstName: registration.firstName.trim(),
      surname: registration.surname.trim(),
      dateOfBirth: registration.dateOfBirth,
      gender: registration.gender,
      email: registration.email.trim().toLowerCase(),
      cellphone: registration.cellphone.trim(),
      password: registration.password,
    }));
    setAuthMessage(currentLanguage.registrationSuccess);
    setRegistration({ firstName: "", surname: "", dateOfBirth: "", gender: "", email: "", cellphone: "", password: "", confirmPassword: "", termsAccepted: false });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const savedAccount = JSON.parse(localStorage.getItem("clinicAccount") || "null");
    const identifier = login.identifier.trim().toLowerCase();
    const matchesAccount = savedAccount && (
      savedAccount.email === identifier || savedAccount.cellphone === login.identifier.trim()
    );

    if (!matchesAccount || savedAccount.password !== login.password) {
      setAuthMessage(currentLanguage.invalidLogin);
      return;
    }

    setAuthMessage(`${currentLanguage.welcomeBack}, ${savedAccount.name}.`);
    setLogin({ identifier: "", password: "", remember: false });
  };

  return (
    <div className="page">
      <nav className="navbar">
        <a className="brand" href="#home" onClick={goHome}>
          <span className="brand-mark">+</span>
          <span className="brand-copy">
            <strong>KwaDlangezwa</strong>
            <small>CLINIC PORTAL</small>
          </span>
        </a>
        <div className="nav-links">
          {navItems.map((item, index) => (
            index === 1 ? (
              <button
                key={item}
                className={`nav-link register-btn ${activeNav === index ? "active" : ""}`}
                onClick={() => openAuthView("register")}
              >
                {item}
              </button>
            ) : index === 2 ? (
              <button
                key={item}
                className={`nav-link ${activeNav === index ? "active" : ""}`}
                onClick={() => openAuthView("login")}
              >
                {item}
              </button>
            ) : (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`nav-link ${activeNav === index ? "active" : ""}`}
                onClick={index === 0 ? goHome : () => setActiveNav(index)}
              >
                {item}
              </a>
            )
          ))}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-art" aria-hidden="true">
          <span className="art-blue" />
          <span className="art-burgundy" />
          <span className="art-gold" />
          <span className="art-silver" />
          <span className="art-charcoal" />
          <span className="art-stethoscope" />
          <svg className="healthcare-illustration" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="30" r="8" fill="none" stroke="rgba(31, 78, 140, 0.2)" strokeWidth="1.5"/>
            <path d="M 42 38 Q 35 45 30 50" fill="none" stroke="rgba(31, 78, 140, 0.2)" strokeWidth="1.5"/>
            <path d="M 58 38 Q 65 45 70 50" fill="none" stroke="rgba(31, 78, 140, 0.2)" strokeWidth="1.5"/>
            <circle cx="25" cy="60" r="5" fill="none" stroke="rgba(31, 78, 140, 0.2)" strokeWidth="1.5"/>
            <circle cx="75" cy="60" r="5" fill="none" stroke="rgba(46, 139, 87, 0.2)" strokeWidth="1.5"/>
            <g transform="translate(50, 70)">
              <rect x="-3" y="-10" width="6" height="20" fill="rgba(142, 69, 69, 0.15)"/>
              <rect x="-10" y="-3" width="20" height="6" fill="rgba(142, 69, 69, 0.15)"/>
            </g>
            <path d="M 20 85 L 25 85 L 27 82 L 30 88 L 33 80 L 35 85 L 40 85" fill="none" stroke="rgba(228, 184, 74, 0.25)" strokeWidth="1"/>
          </svg>
        </div>
        <div className={`app-content ${authView ? "auth-active" : ""}`}>
          {!authView && (
            <section className="hero-copy">
              <div className="welcome-badge">{currentLanguage.welcome}</div>
              <h1 className="hero-title"><span className="title-blue">KwaDlangezwa</span> <span className="title-maroon">Clinic</span></h1>
              <p className="hero-tagline">{currentLanguage.subtitle}</p>
              <p className="hero-access-message">{currentLanguage.accessMessage}</p>
              <p className="trust-indicator">{currentLanguage.trustIndicator}</p>
              <div className="hero-rule" />
            </section>
          )}

          <section className="hero-overlay language-panel">
            {authView ? (
              <div className="auth-panel">
                <div className="panel-heading">
                  <h2 className="choose-language">{authView === "register" ? currentLanguage.createAccount : currentLanguage.login}</h2>
                </div>
                <form className="auth-form" onSubmit={authView === "register" ? handleRegister : handleLogin}>
                  {authView === "register" && (
                    <div className="form-row">
                      <label>{currentLanguage.firstName}<input required value={registration.firstName} onChange={(event) => setRegistration({ ...registration, firstName: event.target.value })} /></label>
                      <label>{currentLanguage.surname}<input required value={registration.surname} onChange={(event) => setRegistration({ ...registration, surname: event.target.value })} /></label>
                    </div>
                  )}
                  {authView === "register" && (
                    <>
                      <label>{currentLanguage.dateOfBirth}<input required type="date" value={registration.dateOfBirth} onChange={(event) => setRegistration({ ...registration, dateOfBirth: event.target.value })} /></label>
                      <label>{currentLanguage.gender}
                        <select required value={registration.gender} onChange={(event) => setRegistration({ ...registration, gender: event.target.value })}>
                          <option value="">{currentLanguage.selectGender}</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </label>
                    </>
                  )}
                  <label>{authView === "register" ? currentLanguage.emailAddress : currentLanguage.emailOrCellphone}
                    <input
                      required={authView !== "register"}
                      type={authView === "register" ? "email" : "text"}
                      value={authView === "register" ? registration.email : login.identifier}
                      onChange={(event) => authView === "register"
                        ? setRegistration({ ...registration, email: event.target.value })
                        : setLogin({ ...login, identifier: event.target.value })}
                    />
                  </label>
                  {authView === "register" && (
                    <label>{currentLanguage.cellphone}<input required type="tel" value={registration.cellphone} onChange={(event) => setRegistration({ ...registration, cellphone: event.target.value })} /></label>
                  )}
                  <label>{currentLanguage.password}<input required type="password" value={authView === "register" ? registration.password : login.password} onChange={(event) => authView === "register" ? setRegistration({ ...registration, password: event.target.value }) : setLogin({ ...login, password: event.target.value })} /></label>
                  {authView === "register" && (
                    <label>{currentLanguage.confirmPassword}<input required type="password" value={registration.confirmPassword} onChange={(event) => setRegistration({ ...registration, confirmPassword: event.target.value })} /></label>
                  )}
                  {authView === "register" ? (
                    <label className="check-row"><input required type="checkbox" checked={registration.termsAccepted} onChange={(event) => setRegistration({ ...registration, termsAccepted: event.target.checked })} />{currentLanguage.terms}</label>
                  ) : (
                    <div className="login-options">
                      <label className="check-row"><input type="checkbox" checked={login.remember} onChange={(event) => setLogin({ ...login, remember: event.target.checked })} />{currentLanguage.rememberMe}</label>
                      <button type="button" className="text-action">{currentLanguage.forgotPassword}</button>
                    </div>
                  )}
                  <button className="auth-submit" type="submit">{authView === "register" ? currentLanguage.register : currentLanguage.login}</button>
                </form>
                {authMessage && <p className="auth-message" role="status">{authMessage}</p>}
                <div className="auth-divider"><span />{authView === "register" ? "" : "OR"}<span /></div>
                <button className="auth-switch" onClick={() => openAuthView(authView === "register" ? "login" : "register")}>
                  {authView === "register" ? currentLanguage.alreadyRegistered : currentLanguage.needAccount}
                </button>
              </div>
            ) : (
              <>
                <div className="panel-heading">
                  <h2 className="choose-language">{currentLanguage.chooseLanguage}</h2>
                </div>
                <div className="lang-cards">
                  <button className={`lang-card ${language === "zu" ? "selected" : ""}`} onClick={() => handleLanguageSelect("zu")}>
                    <span className="lang-icon"><IsiZuluIcon /></span>
                    <span className="lang-text"><span className="lang-name">{currentLanguage.zuluName}</span><span className="lang-sub">{currentLanguage.zuluSub}</span></span>
                    <span className="lang-arrow"><ArrowIcon /></span>
                  </button>
                  <button className={`lang-card ${language === "en" ? "selected" : ""}`} onClick={() => handleLanguageSelect("en")}>
                    <span className="lang-icon"><EnglishIcon /></span>
                    <span className="lang-text"><span className="lang-name">{currentLanguage.englishName}</span><span className="lang-sub">{currentLanguage.englishSub}</span></span>
                    <span className="lang-arrow"><ArrowIcon /></span>
                  </button>
                </div>
                <p className="panel-note">{currentLanguage.secureAccess}</p>
                {language && <p className="lang-confirm">{currentLanguage.confirmation}</p>}
              </>
            )}
          </section>
        </div>
      </header>

      {activeNav === 0 && (
        <>
          <section className="action-cards-section" aria-label="Clinic services">
            <h2 className="action-heading">{currentLanguage.actionHeading}</h2>
            <div className="action-cards">
              <div className="action-card">
                <span className="action-icon">📅</span>
                <h3>{currentLanguage.bookAppointment}</h3>
                <p>{currentLanguage.bookAppointmentDesc}</p>
              </div>
              <div className="action-card">
                <span className="action-icon">🚶</span>
                <h3>{currentLanguage.walkInQueue}</h3>
                <p>{currentLanguage.walkInQueueDesc}</p>
              </div>
              <div className="action-card">
                <span className="action-icon">🔎</span>
                <h3>{currentLanguage.checkVisit}</h3>
                <p>{currentLanguage.checkVisitDesc}</p>
              </div>
            </div>
          </section>

          <section className="feature-strip" aria-label="Clinic benefits">
            {currentLanguage.features.map((feature, index) => (
              <div className="feature-item" key={feature}>
                <span className={`feature-icon feature-icon-${index}`} aria-hidden="true" />
                <strong>{feature}</strong>
              </div>
            ))}
          </section>
        </>
      )}

      <footer className="site-footer">
        <strong>KwaDlangezwa Clinic Portal</strong>
        <p>{currentLanguage.footerMessage}</p>
        <nav className="footer-links" aria-label="Footer links">
          {currentLanguage.footerLinks.map((link) => <a href={`#${link.toLowerCase()}`} key={link}>{link}</a>)}
        </nav>
        <div className="footer-help-section">
          <h3 className="footer-help-title">{currentLanguage.needHelp}</h3>
          <p className="footer-help-text">{currentLanguage.helpAssistance}</p>
          <div className="footer-help-icons">
            <a href="#help" className="help-icon" title="Help">❓</a>
            <a href="#privacy" className="help-icon" title="Privacy Policy">🔒</a>
            <a href="#contact" className="help-icon" title="Contact">📞</a>
          </div>
        </div>
        <small>© 2026 KwaDlangezwa Clinic</small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

