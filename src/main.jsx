import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ArrowIcon, EnglishIcon, IsiZuluIcon } from "./icons";
import "./main.css";

export function App() {
  const [activeNav, setActiveNav] = useState(0);
  const [language, setLanguage] = useState(null);
  const [authView, setAuthView] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [currentPatient, setCurrentPatient] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("clinicAccount") || "null");
    } catch {
      return null;
    }
  });
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
  const patientSections = {
    dashboard: "dashboard",
    appointments: "appointments",
    queue: "queue",
    records: "records",
    messages: "messages",
    settings: "settings",
  };
  const [selectedSection, setSelectedSection] = useState(patientSections.dashboard);
  const [patientNotice, setPatientNotice] = useState("");

  const currentDate = new Date();

  const getGreetingForTime = (date = new Date()) => {
    const hour = date.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

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
      patient: {
        nav: ["Dashboard", "Appointments", "Walk-in queue", "My records", "Messages", "Settings"],
        welcomeBack: "Welcome back",
        backHome: "Back to home",
        notifications: "Notifications",
        logout: "Log out",
        notice: "Your clinic dashboard is up to date.",
        summary: {
          nextAppointment: "Next appointment",
          queueStatus: "Queue status",
          recordStatus: "Record status",
          checkedIn: "Checked in",
          notCheckedIn: "Not checked in",
          patientsAhead: "patients ahead",
          reviewed: "Reviewed",
          daysAgo: "days ago",
          updated: "Updated",
        },
        profile: {
          myProfile: "My profile",
          edit: "Edit",
          name: "Name",
          email: "Email",
          cellphone: "Cellphone",
          dateOfBirth: "Date of birth",
          gender: "Gender",
          notProvided: "Not provided",
        },
        quickActions: {
          title: "Quick actions",
          bookAppointment: "Book appointment",
          viewSlots: "View available slots",
          joinQueue: "Join walk-in queue",
          viewDetails: "View appointment details",
          updateInfo: "Update patient info",
        },
        appointmentQueue: {
          title: "Appointment and queue",
          bookingConfirmed: "Booking confirmed",
          appointmentCancelled: "Appointment cancelled",
          queueTitle: "Walk-in queue",
          checkInReminder: "Check-in reminder",
          arriveReminder: "Please arrive 15 minutes before your consultation time.",
          currentTime: "Current time",
          noAppointment: "No appointment is currently booked.",
          confirmedFor: "Your appointment is confirmed for",
          patientsAhead: "patients are ahead of you.",
          estimatedWait: "Estimated wait",
          minutes: "minutes",
        },
        appointments: {
          title: "Appointments",
          bookTitle: "Book appointment",
          date: "Date",
          time: "Time",
          reason: "Reason",
          confirmBooking: "Confirm booking",
          availableSlots: "Available slots",
          reschedule: "Reschedule appointment",
          newDate: "New date",
          newTime: "New time",
          rescheduleButton: "Reschedule",
          cancel: "Cancel",
          latestAppointment: "Latest appointment",
          noActiveAppointment: "No active appointment",
          selectDateTime: "Please select both a date and time for your appointment.",
          chooseFuture: "Please choose a future date and time for the appointment.",
          selectedSlot: "Selected",
          bookingSaved: "Confirm the booking to save it.",
          reschedulePrompt: "Choose a new date and time before rescheduling.",
          futureReschedule: "Please choose a future date and time for the rescheduled appointment.",
        },
        queue: {
          title: "Walk-in queue",
          checkedIn: "Checked in",
          notCheckedIn: "Not checked in",
          currentPosition: "Current position",
          joined: "Joined",
          joinQueue: "Join queue",
        },
        records: {
          title: "My records",
          latestConsultation: "Latest consultation",
          outstandingReview: "Outstanding review",
          dueIn: "Blood pressure follow-up due in 3 days.",
        },
        messages: {
          title: "Messages",
          clinicMessage: "Clinic message",
          reminderSent: "Appointment reminder was sent on",
        },
        settings: {
          title: "Patient settings",
          firstName: "First name",
          email: "Email",
          cellphone: "Cellphone",
          gender: "Gender",
          selectGender: "Select gender",
          save: "Save changes",
        },
      },
    },
    zu: {
      nav: ["Ikhaya", "Bhalisa", "Ngena", "Mayelana"],
      welcome: "Siyakwamukela e-",
      tagline: "Ukunakekelwa okuhle, kufuphi newe.",
      subtitle: "Ukufinyelela kwezempilo ngesizulu nesiNgisi e-KwaDlangezwa.",
      accessMessage: "Impilo yakho. Ukunakekelwa kwethu. Umphakathi wathu.",
      trustIndicator: "Lula • Okufinyeleka",
      chooseLanguage: "Khetha ulimi oluthandayo",
      actionHeading: "Ongakwenza",
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
      patient: {
        nav: ["Idashboard", "Izinhlelo", "Umgqa wokuhlala", "Amarekhodi ami", "Imilayezo", "Izilungiselelo"],
        welcomeBack: "Siyakwamukela futhi",
        backHome: "Buyela ekhaya",
        notifications: "Izaziso",
        logout: "Phuma",
        notice: "Idashboard yakho yomtholampilo isesimweni.",
        summary: {
          nextAppointment: "Ukuhlela okulandelayo",
          queueStatus: "Isimo somgqa",
          recordStatus: "Isimo serikhodi",
          checkedIn: "Kufakwe emgqeni",
          notCheckedIn: "Akunakufakwa emgqeni",
          patientsAhead: "abathengi ngaphambili",
          reviewed: "Kubuyekezwe",
          daysAgo: "izinsuku ezedlule",
          updated: "Kubuyekeziwe",
        },
        profile: {
          myProfile: "Iphrofayela yami",
          edit: "Hlela",
          name: "Igama",
          email: "I-imeyili",
          cellphone: "Umakhalekhukhwini",
          dateOfBirth: "Usuku lokuzalwa",
          gender: "Ubulili",
          notProvided: "Akunikeziwe",
        },
        quickActions: {
          title: "Izenzo ezisheshayo",
          bookAppointment: "Bhuka isibhedlela",
          viewSlots: "Bona izikhala ezitholakalayo",
          joinQueue: "Joyina umgqa wokuhlala",
          viewDetails: "Bona imininingwane yokuhlela",
          updateInfo: "Buyekeza ulwazi lwesiguli",
        },
        appointmentQueue: {
          title: "Ukuhlela nomgqa",
          bookingConfirmed: "Ukuhlela kuqinisekisiwe",
          appointmentCancelled: "Ukuhlela kukhanseliwe",
          queueTitle: "Umgqa wokuhlala",
          checkInReminder: "Isikhumbuzi sokungena",
          arriveReminder: "Uyacelwa ukuthi ufike 15 imizuzu ngaphambi kwesikhathi sokubonisana.",
          currentTime: "Isikhathi samanje",
          noAppointment: "Akunaso isibhedlela esikuyo okwamanje.",
          confirmedFor: "Ukuhlela kwakho kuqinisekisiwe nge-",
          patientsAhead: "iziguli zikubekele ngaphambili.",
          estimatedWait: "Ukulinda okucashunile",
          minutes: "imizuzu",
        },
        appointments: {
          title: "Izinhlelo",
          bookTitle: "Bhuka ukuhlangabeza",
          date: "Usuku",
          time: "Isikhathi",
          reason: "Isizathu",
          confirmBooking: "Qinisekisa ukubhukha",
          availableSlots: "Izikhala ezitholakalayo",
          reschedule: "Hlela kabusha isibhedlela",
          newDate: "Usuku olusha",
          newTime: "Isikhathi esisha",
          rescheduleButton: "Hlela kabusha",
          cancel: "Khansela",
          latestAppointment: "Ukuhlela kwakamuva",
          noActiveAppointment: "Akunalutho olusebenzayo",
          selectDateTime: "Khetha usuku nesikhathi sokuhlela.",
          chooseFuture: "Khetha usuku nesikhathi esizayo sokuhlela.",
          selectedSlot: "Kukhethiwe",
          bookingSaved: "Qinisekisa ukubhukha ukugcinwa.",
          reschedulePrompt: "Khetha usuku nesikhathi esisha ngaphambi kokuhlela kabusha.",
          futureReschedule: "Khetha usuku nesikhathi esizayo sokuhlela kabusha.",
        },
        queue: {
          title: "Umgqa wokuhlala",
          checkedIn: "Kufakwe emgqeni",
          notCheckedIn: "Akunakufakwa emgqeni",
          currentPosition: "Indawo yamanje",
          joined: "Ijoyine",
          joinQueue: "Joyina umgqa",
        },
        records: {
          title: "Amarekhodi ami",
          latestConsultation: "Ukuhlolwa kwakamuva",
          outstandingReview: "Ukubuyekeza okusalindile",
          dueIn: "Ukubuyekeza i-blood pressure kudinga ezinsukwini ezi-3.",
        },
        messages: {
          title: "Imilayezo",
          clinicMessage: "Umyalezo womtholampilo",
          reminderSent: "Isikhumbuzi sokuhlela sithunyelwe ku",
        },
        settings: {
          title: "Izilungiselelo zesiguli",
          firstName: "Igama",
          email: "I-imeyili",
          cellphone: "Umakhalekhukhwini",
          gender: "Ubulili",
          selectGender: "Khetha ubulili",
          save: "Gcina izinguquko",
        },
      },
    },
  };

  const currentLanguage = translations[language] || translations.en;
  const patientText = currentLanguage.patient;
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
    setCurrentPatient(null);
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

    const account = {
      name: `${registration.firstName.trim()} ${registration.surname.trim()}`,
      firstName: registration.firstName.trim(),
      surname: registration.surname.trim(),
      dateOfBirth: registration.dateOfBirth,
      gender: registration.gender,
      email: registration.email.trim().toLowerCase(),
      cellphone: registration.cellphone.trim(),
      password: registration.password,
    };

    localStorage.setItem("clinicAccount", JSON.stringify(account));
    setCurrentPatient(account);
    setAuthMessage(currentLanguage.registrationSuccess);
    setRegistration({ firstName: "", surname: "", dateOfBirth: "", gender: "", email: "", cellphone: "", password: "", confirmPassword: "", termsAccepted: false });
    setAuthView(null);
    setActiveNav(0);
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

    setCurrentPatient(savedAccount);
    setAuthMessage(`${currentLanguage.welcomeBack}, ${savedAccount.name}.`);
    setLogin({ identifier: "", password: "", remember: false });
    setAuthView(null);
    setActiveNav(0);
  };

  const handleLogout = () => {
    setCurrentPatient(null);
    setAuthMessage("");
    setAuthView(null);
    setActiveNav(0);
  };

  const [appointment, setAppointment] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 7);
    next.setHours(9, 30, 0, 0);
    return {
      date: next.toISOString(),
      reason: "General consultation",
      status: "Confirmed",
    };
  });
  const [queue, setQueue] = useState({
    joined: true,
    joinedAt: new Date().toISOString(),
    position: Math.max(2, Math.min(6, new Date().getMinutes() % 5 + 2)),
  });
  const [bookingDraft, setBookingDraft] = useState({ date: "", time: "", reason: "General consultation" });
  const [rescheduleDraft, setRescheduleDraft] = useState({ date: "", time: "" });
  const [profileDraft, setProfileDraft] = useState(() => ({
    firstName: currentPatient?.firstName || "",
    email: currentPatient?.email || "",
    cellphone: currentPatient?.cellphone || "",
    gender: currentPatient?.gender || "",
  }));

  const handleDashboardAction = (label) => {
    setPatientNotice(label);
  };

  const formatAppointmentDate = (date) =>
    new Intl.DateTimeFormat("en-ZA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  const formatAppointmentTime = (date) =>
    new Intl.DateTimeFormat("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));

  const formatCurrentDateTime = (date) =>
    new Intl.DateTimeFormat("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);

  const toLocalDateValue = (date) => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toLocalTimeValue = (date) => {
    const localDate = new Date(date);
    return `${String(localDate.getHours()).padStart(2, "0")}:${String(localDate.getMinutes()).padStart(2, "0")}`;
  };

  const handleBookAppointment = (event) => {
    event.preventDefault();
    const { date: dateValue, time: timeValue, reason: reasonValue } = bookingDraft;

    if (!dateValue || !timeValue) {
      setPatientNotice("Please select both a date and time for your appointment.");
      return;
    }

    const chosenDate = new Date(`${dateValue}T${timeValue}:00`);
    if (chosenDate <= new Date()) {
      setPatientNotice("Please choose a future date and time for the appointment.");
      return;
    }

    setAppointment({
      date: chosenDate.toISOString(),
      reason: reasonValue,
      status: "Confirmed",
    });
    setSelectedSection(patientSections.appointments);
    setPatientNotice(`Appointment booked for ${formatAppointmentDate(chosenDate)} at ${formatAppointmentTime(chosenDate)}.`);
    setBookingDraft({ date: "", time: "", reason: "General consultation" });
  };

  const handleRescheduleAppointment = () => {
    if (appointment.status === "Cancelled") {
      setPatientNotice("Book a new appointment before trying to reschedule.");
      return;
    }

    if (!rescheduleDraft.date || !rescheduleDraft.time) {
      setPatientNotice("Choose a new date and time before rescheduling.");
      return;
    }

    const rescheduled = new Date(`${rescheduleDraft.date}T${rescheduleDraft.time}:00`);
    if (rescheduled <= new Date()) {
      setPatientNotice("Please choose a future date and time for the rescheduled appointment.");
      return;
    }

    setAppointment({
      date: rescheduled.toISOString(),
      reason: appointment.reason,
      status: "Rescheduled",
    });
    setRescheduleDraft({ date: "", time: "" });
    setSelectedSection(patientSections.appointments);
    setPatientNotice(`Appointment rescheduled to ${formatAppointmentDate(rescheduled)} at ${formatAppointmentTime(rescheduled)}.`);
  };

  const handleCancelAppointment = () => {
    setAppointment({
      date: new Date().toISOString(),
      reason: "No appointment booked",
      status: "Cancelled",
    });
    setRescheduleDraft({ date: "", time: "" });
    setSelectedSection(patientSections.appointments);
    setPatientNotice("Your appointment has been cancelled.");
  };

  const handleJoinQueue = () => {
    const updatedPosition = Math.max(1, Math.min(8, new Date().getMinutes() % 7 + 1));
    setQueue({
      joined: true,
      joinedAt: new Date().toISOString(),
      position: updatedPosition,
    });
    setSelectedSection(patientSections.queue);
    setPatientNotice(`You joined the walk-in queue. Your current position is ${updatedPosition}.`);
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    const updatedPatient = {
      ...currentPatient,
      firstName: profileDraft.firstName.trim() || currentPatient.firstName,
      email: profileDraft.email.trim() || currentPatient.email,
      cellphone: profileDraft.cellphone.trim() || currentPatient.cellphone,
      gender: profileDraft.gender || currentPatient.gender,
      name: `${profileDraft.firstName.trim() || currentPatient.firstName} ${currentPatient.surname}`.trim(),
    };

    localStorage.setItem("clinicAccount", JSON.stringify(updatedPatient));
    setCurrentPatient(updatedPatient);
    setSelectedSection(patientSections.settings);
    setPatientNotice("Patient profile updated successfully.");
  };

  const patientNavItems = [
    { id: patientSections.dashboard, label: patientText.nav[0], icon: "📊" },
    { id: patientSections.appointments, label: patientText.nav[1], icon: "📅" },
    { id: patientSections.queue, label: patientText.nav[2], icon: "⏱️" },
    { id: patientSections.records, label: patientText.nav[3], icon: "🗂️" },
    { id: patientSections.messages, label: patientText.nav[4], icon: "💬" },
    { id: patientSections.settings, label: patientText.nav[5], icon: "⚙️" },
  ];

  if (currentPatient) {
    const greeting = getGreetingForTime();

    const dashboardServices = [
      { icon: "🩺", title: "General Consultation", text: "Doctors & Nurses" },
      { icon: "🧪", title: "HIV / TB Services", text: "Testing & Treatment" },
      { icon: "👶", title: "Maternal & Child Health", text: "ANC, Immunisation, Growth Monitoring" },
      { icon: "💙", title: "Chronic Disease Management", text: "Diabetes, Hypertension, etc." },
    ];

    const healthJourney = [
      { icon: "✅", title: "Registered", text: "10 Jan 2026" },
      { icon: "🩺", title: "First Visit", text: "12 Jan 2026" },
      { icon: "📅", title: "Next Visit", text: "24 Sep 2026" },
      { icon: "💬", title: "Follow-up", text: "TBD" },
    ];

    const quickActions = [
      { label: "Book Appointment", icon: "📅", action: () => setSelectedSection(patientSections.appointments) },
      { label: "My Health Services", icon: "🩺", action: () => setSelectedSection(patientSections.records) },
      { label: "Medical Records", icon: "🗂️", action: () => setSelectedSection(patientSections.records) },
      { label: "Clinic Support", icon: "💬", action: () => setSelectedSection(patientSections.messages) },
    ];

    return (
      <div className="patient-app-shell" aria-label="Patient dashboard">
        <aside className="patient-sidebar">
          <div className="sidebar-brand">
            <span className="brand-mark">+</span>
            <div>
              <strong>KwaDlangezwa</strong>
              <small>{language === "zu" ? "Isiguli" : "Patient portal"}</small>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Patient navigation">
            {patientNavItems.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`sidebar-link ${selectedSection === section.id ? "active" : ""}`}
                onClick={() => setSelectedSection(section.id)}
              >
                <span className="nav-icon" aria-hidden="true">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-profile">
            <div className="avatar">{currentPatient.firstName.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{currentPatient.firstName} {currentPatient.surname}</strong>
              <small>{currentPatient.email}</small>
            </div>
          </div>
        </aside>

        <main className="patient-main">
          <header className="patient-topbar">
            <div className="greeting-block" aria-hidden="true"></div>
            <div className="topbar-actions">
              <button type="button" className="ghost-button" onClick={goHome}><span aria-hidden="true">🏠</span>{patientText.backHome}</button>
              <button type="button" className="ghost-button" onClick={() => setPatientNotice(`${language === "zu" ? "Izaziso" : "Notifications"} checked at ${formatCurrentDateTime(currentDate)}.`)}><span aria-hidden="true">🔔</span>{patientText.notifications}</button>
              <button type="button" className="logout-button" onClick={handleLogout}><span aria-hidden="true">🚪</span>{patientText.logout}</button>
            </div>
          </header>

          {patientNotice && <div className="notice-box" role="status">{patientNotice}</div>}

          {selectedSection === patientSections.dashboard && (
            <>
              <section className="dashboard-hero">
                <div className="hero-copy-panel">
                  <span className="eyebrow">{greeting}</span>
                  <h2>Lindokuhle Dube</h2>
                  <p className="hero-mini-tag">Your health journey starts here.</p>
                </div>
              </section>

              <section className="overview-cards">
                <article className="overview-card primary-card">
                  <span>{patientText.summary.nextAppointment}</span>
                  <strong>{formatAppointmentDate(appointment.date)}</strong>
                  <small>Dr. Mokoena • {formatAppointmentTime(appointment.date)}</small>
                </article>
                <article className="overview-card">
                  <span>{patientText.summary.queueStatus}</span>
                  <strong>{queue.joined ? patientText.summary.checkedIn : patientText.summary.notCheckedIn}</strong>
                  <small>{queue.position} {patientText.summary.patientsAhead}</small>
                </article>
                <article className="overview-card">
                  <span>{patientText.summary.recordStatus}</span>
                  <strong>{patientText.summary.updated}</strong>
                  <small>{patientText.summary.reviewed} {Math.max(1, new Date().getDate() % 12)} {patientText.summary.daysAgo}</small>
                </article>
              </section>

              <section className="quick-actions-panel">
                <div className="card-heading">
                  <h3>What would you like to do?</h3>
                </div>
                <div className="action-tiles">
                  {quickActions.map((action) => (
                    <button key={action.label} type="button" className="action-tile" onClick={action.action}>
                      <span className="tile-icon">{action.icon}</span>
                      <span className="tile-label">{action.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="content-grid">
                <article className="info-card health-card">
                  <div className="card-heading spaced">
                    <h3>Your Health Journey</h3>
                    <button type="button" className="inline-action">More Tips</button>
                  </div>
                  <div className="journey-list">
                    {healthJourney.map((item) => (
                      <div key={item.title} className="journey-item">
                        <span className="journey-icon success">{item.icon}</span>
                        <div>
                          <strong>{item.title}</strong>
                          <small>{item.text}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="info-card clinic-card">
                  <div className="card-heading spaced">
                    <h3>Clinic Services</h3>
                    <button type="button" className="inline-action">View All</button>
                  </div>
                  <div className="icon-list">
                    {dashboardServices.map((item) => (
                      <div key={item.title} className="icon-row">
                        <span className="icon-wrap">{item.icon}</span>
                        <div className="icon-copy">
                          <strong>{item.title}</strong>
                          <small>{item.text}</small>
                        </div>
                        <span className="service-arrow" aria-hidden="true">›</span>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>
          )}

          {selectedSection === patientSections.appointments && (
            <section className="patient-view-panel">
              <div className="panel-header">
                <h3>{patientText.appointments.title}</h3>
              </div>

              <div className="patient-view-grid">
                <div className="mini-card">
                  <h4>{patientText.appointments.bookTitle}</h4>
                  <form className="booking-form" onSubmit={handleBookAppointment}>
                    <label>
                      {patientText.appointments.date}
                      <input
                        type="date"
                        name="date"
                        min={toLocalDateValue(new Date())}
                        value={bookingDraft.date}
                        onChange={(event) => setBookingDraft({ ...bookingDraft, date: event.target.value })}
                      />
                    </label>
                    <label>
                      {patientText.appointments.time}
                      <input
                        type="time"
                        name="time"
                        value={bookingDraft.time}
                        onChange={(event) => setBookingDraft({ ...bookingDraft, time: event.target.value })}
                      />
                    </label>
                    <label>
                      {patientText.appointments.reason}
                      <input
                        type="text"
                        name="reason"
                        value={bookingDraft.reason}
                        onChange={(event) => setBookingDraft({ ...bookingDraft, reason: event.target.value })}
                      />
                    </label>
                    <button type="submit" className="primary-action">{patientText.appointments.confirmBooking}</button>
                  </form>
                </div>

                <div className="mini-card">
                  <h4>{patientText.appointments.availableSlots}</h4>
                  <div className="slot-list">
                    {[0, 1, 2, 3, 4, 5].map((offset) => {
                      const slot = new Date();
                      slot.setDate(slot.getDate() + offset + 1);
                      slot.setHours(9 + (offset % 3), 30, 0, 0);

                      return (
                        <button
                          key={offset}
                          type="button"
                          className="slot-button"
                          onClick={() => {
                            setBookingDraft({
                              ...bookingDraft,
                              date: toLocalDateValue(slot),
                              time: toLocalTimeValue(slot),
                            });
                            setPatientNotice(`${patientText.appointments.selectedSlot} ${formatAppointmentDate(slot)} at ${formatAppointmentTime(slot)}. ${patientText.appointments.bookingSaved}`);
                          }}
                        >
                          {formatAppointmentDate(slot)} • {formatAppointmentTime(slot)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="reschedule-form">
                <h4>{patientText.appointments.reschedule}</h4>
                <div className="booking-form-inline">
                  <label>
                    {patientText.appointments.newDate}
                    <input
                      type="date"
                      min={toLocalDateValue(new Date())}
                      value={rescheduleDraft.date}
                      onChange={(event) => setRescheduleDraft({ ...rescheduleDraft, date: event.target.value })}
                    />
                  </label>
                  <label>
                    {patientText.appointments.newTime}
                    <input
                      type="time"
                      value={rescheduleDraft.time}
                      onChange={(event) => setRescheduleDraft({ ...rescheduleDraft, time: event.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div className="button-row">
                <button type="button" className="primary-action" onClick={handleRescheduleAppointment}>{patientText.appointments.rescheduleButton}</button>
                <button type="button" className="ghost-button" onClick={handleCancelAppointment}>{patientText.appointments.cancel}</button>
              </div>

              <div className="status-list detail-list">
                <div className="status-item">
                  <span className="status-badge approved" />
                  <div>
                    <strong>{patientText.appointments.latestAppointment}</strong>
                    <small>{appointment.status === "Cancelled" ? patientText.appointments.noActiveAppointment : `${appointment.reason} • ${formatAppointmentDate(appointment.date)} at ${formatAppointmentTime(appointment.date)}`}</small>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedSection === patientSections.queue && (
            <section className="patient-view-panel">
              <div className="panel-header">
                <h3>{patientText.queue.title}</h3>
              </div>
              <div className="queue-box">
                <strong>{queue.joined ? patientText.queue.checkedIn : patientText.queue.notCheckedIn}</strong>
                <p>{patientText.queue.currentPosition}: {queue.position}</p>
                <small>{patientText.queue.joined}: {formatAppointmentDate(queue.joinedAt)} at {formatAppointmentTime(queue.joinedAt)}</small>
              </div>
              <button type="button" className="primary-action" onClick={handleJoinQueue}>{patientText.queue.joinQueue}</button>
            </section>
          )}

          {selectedSection === patientSections.records && (
            <section className="patient-view-panel records-page">
              <div className="panel-header records-header">
                <div>
                  <span className="section-kicker">Health library</span>
                  <h3>{patientText.records.title}</h3>
                  <p>Keep track of your consultations, reviews, and care history.</p>
                </div>
                <button type="button" className="secondary-action"><span aria-hidden="true">⇩</span> Download records</button>
              </div>

              <div className="records-summary">
                <div className="records-summary-item">
                  <span className="summary-icon blue">🗂️</span>
                  <div><strong>2</strong><small>Available records</small></div>
                </div>
                <div className="records-summary-item">
                  <span className="summary-icon green">✓</span>
                  <div><strong>1</strong><small>Completed consultation</small></div>
                </div>
                <div className="records-summary-item">
                  <span className="summary-icon amber">!</span>
                  <div><strong>1</strong><small>Needs your attention</small></div>
                </div>
              </div>

              <div className="records-section-heading">
                <h4>Recent activity</h4>
                <span>Updated today</span>
              </div>
              <div className="record-list">
                <article className="record-card completed-record">
                  <div className="record-icon">🩺</div>
                  <div className="record-content">
                    <div className="record-title-row">
                      <div><strong>{patientText.records.latestConsultation}</strong><span>General consultation</span></div>
                      <span className="record-status completed">Completed</span>
                    </div>
                    <div className="record-meta"><span>📅 {formatCurrentDateTime(new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 14))}</span><span>👨‍⚕️ Dr. Mokoena</span></div>
                  </div>
                  <button type="button" className="record-action" aria-label="View latest consultation">›</button>
                </article>
                <article className="record-card review-record">
                  <div className="record-icon">📄</div>
                  <div className="record-content">
                    <div className="record-title-row">
                      <div><strong>{patientText.records.outstandingReview}</strong><span>Blood pressure follow-up</span></div>
                      <span className="record-status pending">Due soon</span>
                    </div>
                    <div className="record-meta"><span>⏱ {patientText.records.dueIn}</span><span>Clinic review</span></div>
                  </div>
                  <button type="button" className="record-action" aria-label="View outstanding review">›</button>
                </article>
              </div>
            </section>
          )}

          {selectedSection === patientSections.messages && (
            <section className="patient-view-panel messages-page">
              <div className="panel-header messages-header">
                <div>
                  <span className="section-kicker">Stay connected</span>
                  <h3>{patientText.messages.title}</h3>
                  <p>Messages and reminders from your clinic team.</p>
                </div>
                <button type="button" className="secondary-action"><span aria-hidden="true">✓</span> Mark all read</button>
              </div>

              <div className="message-layout">
                <aside className="message-folders">
                  <button type="button" className="message-folder active"><span>💬</span> All messages <strong>1</strong></button>
                  <button type="button" className="message-folder"><span>🔔</span> Reminders</button>
                  <button type="button" className="message-folder"><span>📌</span> Important</button>
                </aside>
                <article className="message-card">
                  <div className="message-card-top"><span className="message-unread">New</span><time>{new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(new Date())}</time></div>
                  <div className="message-sender">
                    <div className="sender-avatar">K</div>
                    <div><strong>KwaDlangezwa Clinic</strong><span>Clinic care team</span></div>
                  </div>
                  <div className="message-body">
                    <h4>{patientText.messages.clinicMessage}</h4>
                    <p>{patientText.messages.reminderSent} {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(new Date())}. Please remember to bring your clinic card and arrive 15 minutes before your consultation.</p>
                  </div>
                  <div className="message-actions"><button type="button" className="primary-action"><span aria-hidden="true">↩</span> Reply to clinic</button><button type="button" className="ghost-button" aria-label="Archive message">Archive</button></div>
                </article>
              </div>
            </section>
          )}

          {selectedSection === patientSections.settings && (
            <section className="patient-view-panel">
              <div className="panel-header">
                <h3>{patientText.settings.title}</h3>
              </div>

              <form className="booking-form" onSubmit={handleSaveProfile}>
                <label>
                  {patientText.settings.firstName}
                  <input
                    type="text"
                    value={profileDraft.firstName}
                    onChange={(event) => setProfileDraft({ ...profileDraft, firstName: event.target.value })}
                  />
                </label>
                <label>
                  {patientText.settings.email}
                  <input
                    type="email"
                    value={profileDraft.email}
                    onChange={(event) => setProfileDraft({ ...profileDraft, email: event.target.value })}
                  />
                </label>
                <label>
                  {patientText.settings.cellphone}
                  <input
                    type="tel"
                    value={profileDraft.cellphone}
                    onChange={(event) => setProfileDraft({ ...profileDraft, cellphone: event.target.value })}
                  />
                </label>
                <label>
                  {patientText.settings.gender}
                  <select
                    value={profileDraft.gender}
                    onChange={(event) => setProfileDraft({ ...profileDraft, gender: event.target.value })}
                  >
                    <option value="">{patientText.settings.selectGender}</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </label>
                <button type="submit" className="primary-action">{patientText.settings.save}</button>
              </form>
            </section>
          )}
        </main>
      </div>
    );
  }

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
                      <button type="button" className="text-action" onClick={() => setAuthMessage("Password reset link sent to your email or cellphone.")}>{currentLanguage.forgotPassword}</button>
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

      {currentPatient ? (
        <div className="patient-app-shell" aria-label="Patient dashboard">
          <aside className="patient-sidebar">
            <div className="sidebar-brand">
              <span className="brand-mark">+</span>
              <div>
                <strong>KwaDlangezwa</strong>
                <small>{language === "zu" ? "Isiguli" : "Patient portal"}</small>
              </div>
            </div>

            <nav className="sidebar-nav" aria-label="Patient navigation">
              {patientNavItems.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`sidebar-link ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="sidebar-profile">
              <div className="avatar">{currentPatient.firstName.charAt(0).toUpperCase()}</div>
              <div>
                <strong>{currentPatient.firstName}</strong>
                <small>{currentPatient.email}</small>
              </div>
            </div>
          </aside>

          <main className="patient-main">
            <header className="patient-topbar">
              <div className="greeting-block">
                <p className="topbar-label">{getGreetingForTime()}</p>
                <h1 aria-label="Patient area"></h1>
              </div>
              <div className="topbar-actions">
                <button type="button" className="ghost-button" onClick={goHome}>{patientText.backHome}</button>
                <button type="button" className="ghost-button" onClick={() => setPatientNotice(`${language === "zu" ? "Izaziso" : "Notifications"} checked at ${formatCurrentDateTime(currentDate)}.`)}>{patientText.notifications}</button>
                <button type="button" className="logout-button" onClick={handleLogout}>{patientText.logout}</button>
              </div>
            </header>

            {patientNotice && <div className="notice-box" role="status">{patientNotice}</div>}

            {selectedSection === patientSections.dashboard && (
              <>
                <section className="dashboard-hero">
                  <div className="hero-copy-panel">
                    <h2>Better care today for a healthier tomorrow.</h2>
                  </div>
                </section>

                <section className="overview-cards">
                  <article className="overview-card primary-card">
                    <span>{patientText.summary.nextAppointment}</span>
                    <strong>{formatAppointmentDate(appointment.date)}</strong>
                    <small>Dr. Mokoena • {formatAppointmentTime(appointment.date)}</small>
                  </article>
                  <article className="overview-card">
                    <span>{patientText.summary.queueStatus}</span>
                    <strong>{queue.joined ? patientText.summary.checkedIn : patientText.summary.notCheckedIn}</strong>
                    <small>{queue.position} {patientText.summary.patientsAhead}</small>
                  </article>
                  <article className="overview-card">
                    <span>{patientText.summary.recordStatus}</span>
                    <strong>{patientText.summary.updated}</strong>
                    <small>{patientText.summary.reviewed} {Math.max(1, new Date().getDate() % 12)} {patientText.summary.daysAgo}</small>
                  </article>
                </section>

                <section className="content-grid">
                  <article className="info-card">
                    <div className="card-heading">
                      <h3>Clinic services</h3>
                      <span className="small-badge">Live</span>
                    </div>
                    <div className="icon-list">
                      {[{ icon: "📅", title: "Appointments", text: "Book, reschedule, and track your clinic visit." }, { icon: "🩺", title: "Consultations", text: "Review upcoming visits and consultation notes." }, { icon: "💊", title: "Prescriptions", text: "Keep up with medicines and follow-up care." }, { icon: "🧪", title: "Results", text: "View test reports and monitor your progress." }].map((item) => (
                        <div key={item.title} className="icon-row">
                          <span className="icon-wrap">{item.icon}</span>
                          <div>
                            <strong>{item.title}</strong>
                            <small>{item.text}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="info-card">
                    <div className="card-heading">
                      <h3>Your health journey</h3>
                      <span className="small-badge accent">Care</span>
                    </div>
                    <div className="journey-list">
                      {[{ icon: "✅", title: "Current status", text: "Everything is up to date." }, { icon: "📈", title: "Progress", text: "Your follow-up plan is on track." }, { icon: "💬", title: "Support", text: "Clinic messages are ready when you need them." }].map((item) => (
                        <div key={item.title} className="journey-item">
                          <span className="icon-wrap success">{item.icon}</span>
                          <div>
                            <strong>{item.title}</strong>
                            <small>{item.text}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </section>

                <section className="quick-actions-panel">
                  <div className="card-heading">
                    <h3>Quick actions</h3>
                  </div>
                  <div className="action-tiles">
                    {[{ label: "Book appointment", icon: "📅", action: () => setSelectedSection(patientSections.appointments) }, { label: "View slots", icon: "🗓️", action: () => setSelectedSection(patientSections.appointments) }, { label: "Join walk-in queue", icon: "🧍", action: handleJoinQueue }, { label: "Update profile", icon: "✏️", action: () => setSelectedSection(patientSections.settings) }].map((action) => (
                      <button key={action.label} type="button" className="action-tile" onClick={action.action}>
                        <span className="tile-icon">{action.icon}</span>
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}

            {selectedSection === patientSections.appointments && (
              <section className="patient-view-panel">
                <div className="panel-header">
                  <h3>{patientText.appointments.title}</h3>
                </div>

                <div className="patient-view-grid">
                  <div className="mini-card">
                    <h4>{patientText.appointments.bookTitle}</h4>
                    <form className="booking-form" onSubmit={handleBookAppointment}>
                      <label>
                        {patientText.appointments.date}
                        <input type="date" name="date" min={toLocalDateValue(new Date())} value={bookingDraft.date} onChange={(event) => setBookingDraft({ ...bookingDraft, date: event.target.value })} />
                      </label>
                      <label>
                        {patientText.appointments.time}
                        <input type="time" name="time" value={bookingDraft.time} onChange={(event) => setBookingDraft({ ...bookingDraft, time: event.target.value })} />
                      </label>
                      <label>
                        {patientText.appointments.reason}
                        <input type="text" name="reason" value={bookingDraft.reason} onChange={(event) => setBookingDraft({ ...bookingDraft, reason: event.target.value })} />
                      </label>
                      <button type="submit" className="primary-action">{patientText.appointments.confirmBooking}</button>
                    </form>
                  </div>

                  <div className="mini-card">
                    <h4>{patientText.appointments.availableSlots}</h4>
                    <div className="slot-list">
                      {[0, 1, 2, 3, 4, 5].map((offset) => {
                        const slot = new Date();
                        slot.setDate(slot.getDate() + offset + 1);
                        slot.setHours(9 + (offset % 3), 30, 0, 0);

                        return (
                          <button
                            key={offset}
                            type="button"
                            className="slot-button"
                            onClick={() => {
                              setBookingDraft({ ...bookingDraft, date: toLocalDateValue(slot), time: toLocalTimeValue(slot) });
                              setPatientNotice(`${patientText.appointments.selectedSlot} ${formatAppointmentDate(slot)} at ${formatAppointmentTime(slot)}. ${patientText.appointments.bookingSaved}`);
                            }}
                          >
                            {formatAppointmentDate(slot)} • {formatAppointmentTime(slot)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="reschedule-form">
                  <h4>{patientText.appointments.reschedule}</h4>
                  <div className="booking-form-inline">
                    <label>
                      {patientText.appointments.newDate}
                      <input type="date" min={toLocalDateValue(new Date())} value={rescheduleDraft.date} onChange={(event) => setRescheduleDraft({ ...rescheduleDraft, date: event.target.value })} />
                    </label>
                    <label>
                      {patientText.appointments.newTime}
                      <input type="time" value={rescheduleDraft.time} onChange={(event) => setRescheduleDraft({ ...rescheduleDraft, time: event.target.value })} />
                    </label>
                  </div>
                </div>

                <div className="button-row">
                  <button type="button" className="primary-action" onClick={handleRescheduleAppointment}>{patientText.appointments.rescheduleButton}</button>
                  <button type="button" className="ghost-button" onClick={handleCancelAppointment}>{patientText.appointments.cancel}</button>
                </div>

                <div className="status-list detail-list">
                  <div className="status-item">
                    <span className="status-badge approved" />
                    <div>
                      <strong>{patientText.appointments.latestAppointment}</strong>
                      <small>{appointment.status === "Cancelled" ? patientText.appointments.noActiveAppointment : `${appointment.reason} • ${formatAppointmentDate(appointment.date)} at ${formatAppointmentTime(appointment.date)}`}</small>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {selectedSection === patientSections.queue && (
              <section className="patient-view-panel">
                <div className="panel-header">
                  <h3>{patientText.queue.title}</h3>
                </div>
                <div className="queue-box">
                  <strong>{queue.joined ? patientText.queue.checkedIn : patientText.queue.notCheckedIn}</strong>
                  <p>{patientText.queue.currentPosition}: {queue.position}</p>
                  <small>{patientText.queue.joined}: {formatAppointmentDate(queue.joinedAt)} at {formatAppointmentTime(queue.joinedAt)}</small>
                </div>
                <button type="button" className="primary-action" onClick={handleJoinQueue}>{patientText.queue.joinQueue}</button>
              </section>
            )}

            {selectedSection === patientSections.records && (
              <section className="patient-view-panel">
                <div className="panel-header">
                  <h3>{patientText.records.title}</h3>
                </div>
                <div className="status-list detail-list">
                  <div className="status-item">
                    <span className="status-badge approved" />
                    <div>
                      <strong>{patientText.records.latestConsultation}</strong>
                      <small>{formatCurrentDateTime(new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 14))}</small>
                    </div>
                  </div>
                  <div className="status-item">
                    <span className="status-badge waiting" />
                    <div>
                      <strong>{patientText.records.outstandingReview}</strong>
                      <small>{patientText.records.dueIn}</small>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {selectedSection === patientSections.messages && (
              <section className="patient-view-panel">
                <div className="panel-header">
                  <h3>{patientText.messages.title}</h3>
                </div>
                <div className="status-list detail-list">
                  <div className="status-item">
                    <span className="status-badge approved" />
                    <div>
                      <strong>{patientText.messages.clinicMessage}</strong>
                      <small>{patientText.messages.reminderSent} {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(new Date())}.</small>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {selectedSection === patientSections.settings && (
              <section className="patient-view-panel">
                <div className="panel-header">
                  <h3>{patientText.settings.title}</h3>
                </div>

                <form className="booking-form" onSubmit={handleSaveProfile}>
                  <label>
                    {patientText.settings.firstName}
                    <input type="text" value={profileDraft.firstName} onChange={(event) => setProfileDraft({ ...profileDraft, firstName: event.target.value })} />
                  </label>
                  <label>
                    {patientText.settings.email}
                    <input type="email" value={profileDraft.email} onChange={(event) => setProfileDraft({ ...profileDraft, email: event.target.value })} />
                  </label>
                  <label>
                    {patientText.settings.cellphone}
                    <input type="tel" value={profileDraft.cellphone} onChange={(event) => setProfileDraft({ ...profileDraft, cellphone: event.target.value })} />
                  </label>
                  <label>
                    {patientText.settings.gender}
                    <select value={profileDraft.gender} onChange={(event) => setProfileDraft({ ...profileDraft, gender: event.target.value })}>
                      <option value="">{patientText.settings.selectGender}</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </label>
                  <button type="submit" className="primary-action">{patientText.settings.save}</button>
                </form>
              </section>
            )}
          </main>
        </div>
      ) : (
        activeNav === 0 && (
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
        )
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

