package pl.mk.recipot.files.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileDto {

	public String name;
	public String url;
	public String type;
	public long size;

}