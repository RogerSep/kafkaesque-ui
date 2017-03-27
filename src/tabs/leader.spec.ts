import { leader as l } from './leader'
import { Observable } from 'rx'
import { jsdom } from 'jsdom'
import { Topic, topic } from '../topics/topic'

describe( "Leader execution", () => {

  let leader: (f: () => void) => void
  let garbageTopic: Topic<string>

  beforeEach( () => {
    garbageTopic = topic(window)[0]

    leader = l(Observable.interval(1000), garbageTopic, window)
    window.localStorage = {
      length: 0,
      setItem: jest.fn(),
      getItem: jest.fn()
    }
  } )

  test( "Execute the provided function on the leader", () => {

    const spy = jest.fn()
    expect( window.localStorage.getItem ).not.toHaveBeenCalled()
    expect( window.localStorage.setItem ).not.toHaveBeenCalled()
    expect( spy ).not.toHaveBeenCalled()

    leader( spy )

    expect( window.localStorage.getItem ).toHaveBeenCalled()
    expect( window.localStorage.setItem ).toHaveBeenCalled()
    expect( spy ).toHaveBeenCalled()

    expect( window.localStorage.setItem.mock.calls[0][0] ).toBe('kafkaesque-ui.leader')
    expect( window.localStorage.setItem.mock.calls[0][1] ).toBeTruthy()

  } )

  test( "Execute the provided function at most once", () => {

    const spy = jest.fn()

    expect( spy ).not.toHaveBeenCalled()
    leader( spy )
    leader( spy )
    leader( spy )
    expect( spy ).toHaveBeenCalledTimes( 1 )

  } )

  test( "Should work amongst tabs", () => {

    const tab1 = jsdom('')
    const tab2 = jsdom('')

  } )

} )
