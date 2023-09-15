package pl.mk.recipot.commons.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mk.recipot.commons.enums.SearchOrder;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SearchOrderDto {
	public String fieldName;
	public SearchOrder order;

}
