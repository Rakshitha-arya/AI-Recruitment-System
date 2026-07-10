import fitz  # PyMuPDF
from docx import Document


def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF resume.
    """
    text = ""

    document = fitz.open(pdf_path)

    for page in document:
        text += page.get_text()

    document.close()

    return text


def extract_text_from_docx(docx_path):
    """
    Extract text from a DOCX resume.
    """
    document = Document(docx_path)

    text = ""

    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"

    return text


def extract_resume_text(file_path):
    """
    Detect file type and extract text.
    """

    if file_path.lower().endswith(".pdf"):
        return extract_text_from_pdf(file_path)

    elif file_path.lower().endswith(".docx"):
        return extract_text_from_docx(file_path)

    else:
        raise ValueError("Unsupported file format.")