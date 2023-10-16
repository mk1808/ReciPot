package pl.mk.recipot.auth.domains;

import org.slf4j.Logger;

public class GetTokenFromHeader {
	
	public static final String BEARER_PREFIX = "Bearer ";
	
	public String execute(String tokenHeader, Logger log) {
		return tokenExists(tokenHeader, log) ? tokenHeader.substring(7) : null;
	}

	private boolean tokenExists(String tokenHeader,  Logger log) {
		if (tokenHeader != null && tokenHeader.startsWith(BEARER_PREFIX)) {
			return true;
		}
		return false;
	}
}
