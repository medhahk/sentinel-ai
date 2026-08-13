def query_sentinel_llm(user_prompt: str, context: str = "ALL_SCANS") -> str:
    lower = user_prompt.lower()
    if "cve" in lower or "explain" in lower:
        return """### SentinelAI RAG CVE Analysis

**Target Vulnerability**: CVE-2024-21887 (SQL Injection in Auth API)
**CVSS 3.1 Score**: 9.8 (Critical)

#### Technical Breakdown:
An unauthenticated attacker can manipulate the `username` parameter in `POST /api/v1/auth/login` to bypass authentication and execute arbitrary database queries.

#### Remediation Steps:
1. Use Prepared Statements / Parameterized Queries.
2. Set Content-Security-Policy (CSP) headers.
3. Validate and sanitize user inputs with DOMPurify / Pydantic."""
    elif "summary" in lower or "executive" in lower:
        return """### SentinelAI Executive Security Synthesis

- **Assets Monitored**: 5 Host Nodes
- **Critical Findings**: 2 (Immediate Action Required)
- **High Findings**: 3
- **Overall Security Score**: 76 / 100

**Key Recommendation**: Patch SQL Injection on `api.internal-auth.prod` immediately."""
    else:
        return f"""### SentinelAI RAG Security Response

**Query**: *{user_prompt}*
**Knowledge Base Context**: {context}

1. **Risk Assessment**: High severity potential vector.
2. **Standard Mappings**: OWASP Top 10 A03:2021-Injection | CWE-89.
3. **Action Item**: Inspect finding details in Vulnerability Matrix."""
