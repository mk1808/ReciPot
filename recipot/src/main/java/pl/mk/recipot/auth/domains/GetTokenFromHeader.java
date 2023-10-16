package pl.mk.recipot.auth.domains;

public class GetTokenFromHeader {
	
	public static final String BEARER_PREFIX = "Bearer ";
	
	public String execute(String tokenHeader) {
		return tokenExists(tokenHeader) ? tokenHeader.substring(7) : null;
	}

	private boolean tokenExists(String tokenHeader) {
		return tokenHeader != null && tokenHeader.startsWith(BEARER_PREFIX);
	}
}
