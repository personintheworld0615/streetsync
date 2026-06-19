# Product Requirement Document (PRD)

**Project Name:** StreetSync  
**Author:** Aarav Garg, Krish Sinha, Rithvik Penmetsa  
**Target Event:** 2026 Congressional App Challenge  
**Document Version:** 1.2 – Optimized MVP Scope  

---

## 1. Product Overview & Vision
CivicPulse is a civic engagement platform designed to simplify communication between residents and municipal governments. The platform reduces the friction of traditional city reporting systems by allowing users to quickly submit infrastructure and community issues using voice input, GPS telemetry, and image capture.

CivicPulse enables citizens to improve their neighborhoods through two primary workflows:
1. **Voice-Activated Reporting** for safe, fast infrastructure reporting
2. **Community Walking Mode** for localized environmental, accessibility, and safety concerns

The platform also introduces backend intelligence systems that help municipalities manage incoming reports more effectively through issue prioritization, duplicate clustering, and reporter reliability scoring.

---

## 2. Target Audience & Scope

### The Commuter/Transit User
Needs a fast, low-interaction way to report infrastructure failures such as potholes, damaged traffic signals, or roadway hazards while stationary, commuting, or riding as a passenger.

### The Neighborhood Advocate
Pedestrians, cyclists, and residents seeking to report localized issues such as illegal dumping, broken sidewalk curbs, blocked wheelchair ramps, or environmental hazards.

### Target Municipality
Single pilot municipality with hardcoded city coordinates and reporting endpoints for MVP deployment and testing.

---

## 3. Core Features & Functional Requirements

### 3.1 Mode 1: Voice-Activated Reporting (Hands-Free/Passenger Mode)
* **Requirement 1.1: Simplified Voice Trigger**  
  The app utilizes native voice activation or a large tap-to-record interface designed for passengers or stationary users to minimize interaction time.
* **Requirement 1.2: Voice-to-Text Processing**  
  Integrates a speech-to-text API to convert the user’s spoken description into a structured report.
* **Requirement 1.3: Background Telemetry**  
  Automatically captures GPS coordinates ($\text{latitude, longitude}$) and timestamps when the report is initiated.

### 3.2 Mode 2: Community Mode (Stationary/Pedestrian Reporting)
* **Requirement 2.1: Image Capture**  
  Accesses the device camera to collect photographic evidence of infrastructure or environmental issues.
* **Requirement 2.2: Streamlined Categorization**  
  Uses lightweight cloud-based image analysis APIs (or simplified user dropdowns) to classify reports into municipal categories such as Public Works, Environmental Hazards, or Mobility Barriers.
* **Requirement 2.3: ADA Accessibility Priority**  
  Provides dedicated reporting categories for Americans with Disabilities Act (ADA) concerns including broken curb ramps, blocked wheelchair access points, and malfunctioning pedestrian accessibility signals.

### 3.3 Government Pipeline & Backend Logic
* **Requirement 3.1: Proximity-Based Deduplication**  
  To prevent excessive duplicate tickets, the backend performs a geospatial radius check. If a new report matches an existing unresolved issue within a $15\text{-meter}$ radius, the report is grouped into a single master issue.
* **Requirement 3.2: Severity & Urgency Scoring System**  
  Each report is assigned a dynamic severity score based on:
  * Issue category
  * Number of duplicate confirmations
  * Accessibility impact
  * Time unresolved
  * Presence of supporting image evidence
  
  *Example:*  
  * Minor graffiti report $\rightarrow$ Lower severity
  * Blocked wheelchair ramp near public transit $\rightarrow$ High severity  
  This prioritization system allows municipalities to identify critical infrastructure problems more efficiently.

* **Requirement 3.3: Reporter Trust Score System**  
  To reduce spam and improve report reliability, CivicPulse maintains a lightweight trust score for users based on:
  * Accuracy of past reports
  * Number of duplicate confirmations from nearby users
  * Frequency of invalid or low-quality submissions
  * Inclusion of usable image evidence  
  Reports submitted by high-trust users may receive increased weighting within the prioritization system.

* **Requirement 3.4: Automated Municipal Dispatch**  
  The platform formats user-submitted data (Transcribed Text, Category, GPS Coordinates, Timestamp, Severity Score, Trust Score, and Image URL) into a standardized report structure.

#### Implementation
Generates structured email reports for the pilot municipality inbox while simultaneously populating a web-based CivicPulse Dashboard where administrators can:
* View active issues
* Sort by severity
* Track duplicate confirmations
* Mark tickets as resolved

---

## 4. Technical Stack

### Frontend (App UI)
React Native or Flutter for cross-platform iOS and Android deployment from a single codebase.

### Backend & Database
Firebase (Firestore & Cloud Storage) for real-time report synchronization, image hosting, and duplicate cross-referencing.

### AI Models & Processing
* **Voice-to-Text:** OpenAI Whisper API or native speech frameworks for accurate voice transcription.
* **Image Analysis:** Google Cloud Vision API (or AWS Rekognition) for lightweight image categorization and object tagging.

### Automation Scripting
Python cloud functions for:
* Deduplication radius calculations
* Severity score calculations
* Trust score calculations
* Automated municipal email dispatch

---

## 5. Constraints & Out of Scope (MVP Boundaries)

### Emergency Services Disclaimer
CivicPulse is strictly intended for non-emergency public works reporting. The application prominently displays the notice:  
> “This app does not connect to 911 or emergency services.”

### Localized Routing
Multi-city scalability is deferred beyond the MVP scope. Initial deployment will exclusively route reports to the team’s selected pilot municipality to maximize reliability and implementation quality for competition submission.
