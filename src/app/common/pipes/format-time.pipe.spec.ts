import { FormatGRMTimePipe } from '@grmCommon/pipes/format-time.pipe'

describe('FormatGRMTimePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatGRMTimePipe()
    expect(pipe).toBeTruthy()
  })
})