package pl.mk.recipot.opinions.dtos;

import lombok.Builder;

@Builder
public class OpinionDto {
	public String authorLogin;
	public String authorAvatarImageSrc;
	public String comment;
	public Double rating;

	public OpinionDto(String authorLogin, String authorAvatarImageSrc, String comment, Double rating) {
		super();
		this.authorLogin = authorLogin;
		this.authorAvatarImageSrc = authorAvatarImageSrc;
		this.comment = comment;
		this.rating = rating;
	}

}
