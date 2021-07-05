import { sum } from '../src/sum';

describe('blah', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});


// test parser._isName() for this:
// _.isName(Finding Mental Health Care Providers): true
// _.isName(Screening): true
// _.isName(CNM: 001, 002, 003, 013, 019, 021, 031, 033, 043, 046, 061, 077, 088): false
// _.isName(Sex positive: 071, 077): false
// _.isName(LGBTQ: 001, 002, 004, 019, 020, 048, 087): false
// _.isName(Non-religious: 077, 087): false
// _.isName(Logistics): true
// _.isName(Insurance: 002, 019, 044): false
// _.isName(Care via workplace: 020, 057): false
// _.isName(Impact of telehealth: 044, 077): false
// _.isName(Fit: 013, 043, 077, 084): false
// _.isName(Attitudes toward Disclosure): true
// _.isName(Important to disclose: 005, 012, 015, 040, 043, 057, 069): false
// _.isName(Unnecessary: 043, 044, 064, 075, 085, 086, 088): false
// _.isName(Quality of Experience): true
// _.isName(Helpful: 005, 013, 015, 017, 019, 024, 046, 067, 070, 072, 084, 085): false
// _.isName(Supportive/affirming: 006, 010, 016, 020, 036, 049, 051, 061, 062, 065, 071, 077, 083, 086, 088): false
// _.isName(Nonjudgmental: 004, 005, 036, 040, 042, 012, 028, 055, 069, 002, 019, 043, 084, 085, 086, 011, 036): false
// _.isName(Negative: 003, 004, 017, 018, 020, 032, 033, 034, 059, 072, 086, 027, 085): false
// _.isName(Reactions to Providers): true
// _.isName(Educate: 019, 036, 027, 085, 086): false
// _.isName(Confront: 003, 018, 027): false
// _.isName(Continuing: 017, 072, 084): false
// _.isName(Terminated: 003, 004, 020, 086): false