CREATE DATABASE recruitment_system
SHOW DATABASES;
USE recruitment_system;
SELECT DATABASE();
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Candidate', 'Recruiter', 'Admin') NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SHOW TABLES;
DESCRIBE users;
CREATE TABLE candidate_profiles (
    candidate_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_of_birth DATE,
    gender ENUM('Male','Female','Other'),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(10),
    college_name VARCHAR(150),
    degree VARCHAR(100),
    branch VARCHAR(100),
    graduation_year YEAR,
    cgpa DECIMAL(3,2),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);
DESCRIBE candidate_profiles;
CREATE TABLE recruiter_profiles (
    recruiter_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100),
    company_email VARCHAR(100),
    company_phone VARCHAR(15),
    company_website VARCHAR(255),
    company_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE recruiter_profiles;
CREATE TABLE job_postings (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    recruiter_id INT NOT NULL,

    job_title VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    job_location VARCHAR(150),

    employment_type ENUM(
        'Full-time',
        'Part-time',
        'Internship',
        'Contract'
    ) DEFAULT 'Full-time',

    experience_required VARCHAR(50),
    salary_range VARCHAR(100),

    job_description TEXT NOT NULL,
    required_skills TEXT NOT NULL,
    qualifications TEXT,

    application_deadline DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (recruiter_id)
        REFERENCES recruiter_profiles(recruiter_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE job_postings;
CREATE TABLE resumes (
    resume_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,

    resume_title VARCHAR(150),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type ENUM('PDF', 'DOCX') NOT NULL,

    extracted_text LONGTEXT,

    ats_score DECIMAL(5,2) DEFAULT 0.00,
    overall_match_percentage DECIMAL(5,2) DEFAULT 0.00,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE
);
DESCRIBE resumes;
CREATE TABLE resume_skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    resume_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    skill_category VARCHAR(100),
    confidence_score DECIMAL(5,2),

    FOREIGN KEY (resume_id)
        REFERENCES resumes(resume_id)
        ON DELETE CASCADE
);
DESCRIBE resume_skills;
CREATE TABLE job_skills (
    job_skill_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    skill_category VARCHAR(100),
    priority ENUM('Required', 'Preferred') DEFAULT 'Required',

    FOREIGN KEY (job_id)
        REFERENCES job_postings(job_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE job_skills;
CREATE TABLE candidate_matches (
    match_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,
    resume_id INT NOT NULL,
    job_id INT NOT NULL,

    ats_score DECIMAL(5,2),
    match_percentage DECIMAL(5,2),

    matched_skills INT,
    missing_skills INT,

    ranking INT,

    match_status ENUM(
        'Selected',
        'Shortlisted',
        'Rejected',
        'Pending'
    ) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE,

    FOREIGN KEY (resume_id)
        REFERENCES resumes(resume_id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES job_postings(job_id)
        ON DELETE CASCADE
);
DESCRIBE candidate_matches;
CREATE TABLE skill_gaps (
    gap_id INT AUTO_INCREMENT PRIMARY KEY,

    match_id INT NOT NULL,
    missing_skill VARCHAR(100) NOT NULL,
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',

    FOREIGN KEY (match_id)
        REFERENCES candidate_matches(match_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE skill_gaps;
CREATE TABLE learning_recommendations (
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,
    gap_id INT NOT NULL,

    recommended_topic VARCHAR(150) NOT NULL,
    resource_type ENUM('Course', 'Video', 'Article', 'Documentation', 'Practice') NOT NULL,
    resource_link VARCHAR(500),

    estimated_duration VARCHAR(50),
    difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',

    status ENUM('Not Started', 'In Progress', 'Completed') DEFAULT 'Not Started',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE,

    FOREIGN KEY (gap_id)
        REFERENCES skill_gaps(gap_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE learning_recommendations;
CREATE TABLE mock_interviews (
    interview_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,
    job_id INT NOT NULL,

    interview_type ENUM('HR', 'Technical', 'Behavioral') NOT NULL,

    question TEXT NOT NULL,
    candidate_answer TEXT,
    ai_feedback TEXT,

    score DECIMAL(5,2),

    interview_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES job_postings(job_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE mock_interviews;
CREATE TABLE coding_tests (
    test_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,
    job_id INT NOT NULL,

    programming_language VARCHAR(50),
    question_title VARCHAR(200) NOT NULL,
    question_description TEXT NOT NULL,

    candidate_code LONGTEXT,
    test_case_passed INT DEFAULT 0,
    total_test_cases INT DEFAULT 0,

    score DECIMAL(5,2),
    time_taken INT,

    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES job_postings(job_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE coding_tests;
CREATE TABLE aptitude_tests (
    aptitude_test_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,
    job_id INT NOT NULL,

    subject ENUM('Quantitative', 'Logical', 'Verbal') NOT NULL,

    total_questions INT NOT NULL,
    correct_answers INT DEFAULT 0,
    wrong_answers INT DEFAULT 0,

    score DECIMAL(5,2),
    time_taken INT,

    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES job_postings(job_id)
        ON DELETE CASCADE
);
DESCRIBE aptitude_tests;
CREATE TABLE candidate_progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,

    resumes_uploaded INT DEFAULT 0,
    jobs_applied INT DEFAULT 0,

    average_ats_score DECIMAL(5,2) DEFAULT 0.00,
    average_match_percentage DECIMAL(5,2) DEFAULT 0.00,

    coding_tests_completed INT DEFAULT 0,
    aptitude_tests_completed INT DEFAULT 0,
    mock_interviews_completed INT DEFAULT 0,

    learning_completion_percentage DECIMAL(5,2) DEFAULT 0.00,

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE
);
DESCRIBE candidate_progress;
CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,

    candidate_id INT NOT NULL,
    job_id INT NOT NULL,

    report_type ENUM(
        'Resume Analysis',
        'ATS Report',
        'Skill Gap Report',
        'Interview Report',
        'Overall Performance'
    ) NOT NULL,

    report_title VARCHAR(200) NOT NULL,
    report_content LONGTEXT,

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate_profiles(candidate_id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES job_postings(job_id)
        ON DELETE CASCADE
);
SHOW TABLES;
DESCRIBE reports;
USE recruitment_system;

SELECT * FROM users;