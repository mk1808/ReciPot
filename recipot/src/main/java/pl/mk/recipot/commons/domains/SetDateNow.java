package pl.mk.recipot.commons.domains;

import java.util.Date;

import pl.mk.recipot.commons.models.interfaces.IWithDate;

public class SetDateNow {
	public <T extends IWithDate> T execute(T withDate) {
		withDate.setDate(new Date());
		return withDate;
	}
}
