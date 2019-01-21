import Event        from '../../models/event';
import User         from '../../models/user';
import dateToString from './date';

export const modify = event => {
  return {
    ...event._doc,
    _id     : event.id,
    date    : dateToString(event._doc.date),
    creator : user.bind(this, event.creator)
  };
};

export const modifyBooking = booking => {
  return {
    ...booking._doc,
    _id       : booking.id,
    user      : user.bind(this, booking._doc.user),
    event     : singleEvent.bind(this, booking._doc.event),
    createdAt : dateToString(booking._doc.createdAt),
    updatedAt : dateToString(booking._doc.updatedAt),
  };
};

const events = async eventIds => {
  try {
    const events = await Event.find({ _id : { $in : eventIds } });
    return events.map(event => {
      return modify(event);
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id           : user.id,
      createdEvents : events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return modify(event);
  } catch (err) {
    throw err;
  }
};
