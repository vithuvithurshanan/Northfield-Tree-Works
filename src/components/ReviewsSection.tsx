import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/treeServicesData';
import { CustomerReview } from '../types';
import { getCache, setCache, REVIEWS_CACHE_KEY } from '../utils/cache';
import { Star, ShieldCheck, Plus, User, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    return getCache<CustomerReview[]>(REVIEWS_CACHE_KEY, INITIAL_REVIEWS);
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [serviceUsed, setServiceUsed] = useState('Tree Trimming & Pruning');
  const [commentText, setCommentText] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: authorName,
      location: locationName || 'Local Homeowner',
      rating: ratingVal,
      date: 'Just now',
      serviceUsed,
      comment: commentText,
      verified: true,
      avatarSeed: authorName.toLowerCase().replace(/\s+/g, ''),
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    setCache(REVIEWS_CACHE_KEY, updated);

    // Reset
    setAuthorName('');
    setLocationName('');
    setCommentText('');
    setShowAddModal(false);
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-3 border border-white/15">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Verified Customer Feedback</span>
            </div>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            What Homeowners Say About Us
          </h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-[#064E3B] font-extrabold text-xs shadow-lg shadow-[#A3E635]/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          id="write-review-btn"
        >
          <Plus className="w-4 h-4 text-[#064E3B]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass p-6 rounded-[28px] border border-white/20 space-y-4 flex flex-col justify-between shadow-xl hover:border-white/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#A3E635]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-[#A3E635] text-[#A3E635]' : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-gray-300 font-mono">{rev.date}</span>
              </div>

              <p className="text-sm text-gray-200 italic leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm font-extrabold text-white">{rev.author}</p>
                <p className="text-[11px] text-gray-300">{rev.location}</p>
              </div>

              {rev.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[#A3E635] font-bold glass px-2.5 py-1 rounded-full border border-white/15">
                  <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
                  <span>Verified Job</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="glass border border-white/20 rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 text-white">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white">Leave a Review</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-300 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-200 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Smith"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#A3E635]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-200 block mb-1">
                  Neighborhood / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maple Heights"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#A3E635]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-200 block mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRatingVal(s)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= ratingVal ? 'fill-[#A3E635] text-[#A3E635]' : 'text-white/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-200 block mb-1">
                  Service Experienced
                </label>
                <select
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#064E3B] border border-white/15 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                >
                  <option value="Tree Trimming & Pruning">Tree Trimming & Pruning</option>
                  <option value="24/7 Emergency Storm Removal">24/7 Emergency Storm Removal</option>
                  <option value="Hazardous Tree Felling">Hazardous Tree Felling</option>
                  <option value="Stump Grinding & Root Clearance">Stump Grinding & Root Clearance</option>
                  <option value="Arborist Inspection">Arborist Inspection</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-200 block mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the arborist team's work and clean-up..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#A3E635]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl glass text-gray-200 hover:text-white text-xs font-bold cursor-pointer border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-[#064E3B] text-xs font-bold shadow-lg shadow-[#A3E635]/20 cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
